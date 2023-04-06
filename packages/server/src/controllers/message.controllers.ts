import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { TRouteController } from ".";
import { TUserDocLocals } from "@/Middleware";
import { ChatResLocals } from "@/Middleware/Chat.middleware";
import { ControllerErrors } from "utils/ControllerUtils";
import { OpenaiFetcher } from "utils/OpenaiFetcher";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";

const sendMsgErrors = new ControllerErrors(SendMsgRequest.Errors);

/** Returns full user JSON without sensitive data */
export const SendMsgController: TRouteController<
  SendMsgRequest.Request,
  ChatResLocals
> = async (req, res) => {
  try {
    const { chatId, msgBody } = req.body;
    const { chat, user } = res.locals;

    const outgoingMsg = ChatUtils.constructMsg(msgBody);
    const messages = [await chat.getTrainingMsg(), ...chat.messages];

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
    console.log({ tokensUsed, msgCount, cost });

    if (!newMsg) {
      return sendMsgErrors.error.ErrorFetchingChatCompletion(res);
    }

    chat.addMsg(outgoingMsg, newMsg);
    const isChatUpdated = await user.updateChat(chatId, {
      lastMessage: newMsg.content,
    });

    if (!isChatUpdated) {
      return sendMsgErrors.error.InternalServerError(res);
    }

    try {
      chat.save();
      user.save();
    } catch (err) {
      // TODO: add 'unable to save' error handling
      return sendMsgErrors.error.InternalServerError(res);
    }

    return res.json({ newMsg }).end();
  } catch (err) {
    return sendMsgErrors.error.InternalServerError(res);
  }
};