import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { TRouteController } from ".";
import { ChatWithMsgsResLocals } from "@/Middleware/Chat.middleware";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { validateMsg } from "@celeb-chat/shared/src/schema";
import { Controller, ControllerErrors, OpenaiFetcher } from "@/Utils";

/** Returns full user JSON without sensitive data */
export const SendMsgController = Controller<
  SendMsgRequest.Request,
  ChatWithMsgsResLocals
>(async (req, res) => {
  const { error } = new ControllerErrors(res, SendMsgRequest.Errors);
  const { chatId, msgBody } = req.body;
  const { chat, user } = res.locals;

  const validationError = await validateMsg({ msgBody });

  if (validationError) {
    return error.InvalidMsgInput(validationError);
  }

  const outgoingMsg = ChatUtils.constructMsg(msgBody);
  const messages = [await chat.getTrainingMsg(user), ...chat.messages].map(
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
    return error.ErrorFetchingChatCompletion(
      undefined,
      "A new chat was unable to be created"
    );
  }

  const isMsgAdded = await chat.addMsg(outgoingMsg, newMsg);
  const isChatUpdated = await user.updateChat(chatId, {
    lastMessage: newMsg.content,
  });

  if (!isChatUpdated || !isMsgAdded) {
    return error.InternalServerError(
      undefined,
      "An error occurred while adding a message to a chat"
    );
  }

  try {
    await user.save();
    await chat.save();
  } catch (err) {
    return error.InternalServerError(
      undefined,
      "An error occurred while saving a chat and user during message sending"
    );
  }

  return res.json({ newMsg }).end();
});
