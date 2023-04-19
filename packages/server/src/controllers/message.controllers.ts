import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { TRouteController } from ".";
import { TUserDocLocals } from "@/Middleware";
import {
  ChatResLocals,
  ChatWithMsgsResLocals,
} from "@/Middleware/Chat.middleware";
import { ControllerErrors } from "utils/ControllerUtils";
import { OpenaiFetcher } from "utils/OpenaiFetcher";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { SendMsgSchema } from "@celeb-chat/shared/src/schema";
import { ValidationError } from "yup";

const sendMsgErrors = new ControllerErrors(SendMsgRequest.Errors);

/** Returns full user JSON without sensitive data */
export const SendMsgController: TRouteController<
  SendMsgRequest.Request,
  ChatWithMsgsResLocals
> = async (req, res) => {
  try {
    const { chatId, msgBody } = req.body;
    const { chat, user } = res.locals;

    try {
      await SendMsgSchema.validate({ msgBody });
    } catch (err) {
      const validationError = err as ValidationError;

      return sendMsgErrors.error.InvalidMsgInput(
        res,
        validationError?.errors?.[0]
      );
    }

    const outgoingMsg = ChatUtils.constructMsg(msgBody);
    const messages = [await chat.getTrainingMsg(), ...chat.messages].map(
      (m): ChatModel.IndexlessMessage => ({
        content: m.content,
        role: m.role,
      })
    );

    // TODO: Add error handling
    const { data: incomingMsg } = await OpenaiFetcher.fetchChatCompletion(
      msgBody,
      messages
    );

    const newMsg = incomingMsg?.choices?.[0]?.message;
    // TODO: store total & avg token per msg used in DB
    const tokensUsed = incomingMsg.usage?.total_tokens;
    const msgCount = messages.length + 1;
    const cost = ((tokensUsed ?? 0) / 1000) * 0.002;

    if (!newMsg) {
      return sendMsgErrors.error.ErrorFetchingChatCompletion(res);
    }

    const isMsgAdded = await chat.addMsg(outgoingMsg, newMsg);
    const isChatUpdated = await user.updateChat(chatId, {
      lastMessage: newMsg.content,
    });

    if (!isChatUpdated || !isMsgAdded) {
      return sendMsgErrors.error.InternalServerError(res);
    }

    try {
      await user.save();
      await chat.save();
    } catch (err) {
      // TODO: add 'unable to save' error handling
      return sendMsgErrors.error.InternalServerError(res);
    }

    return res.json({ newMsg }).end();
  } catch (err) {
    return sendMsgErrors.error.InternalServerError(res);
  }
};
