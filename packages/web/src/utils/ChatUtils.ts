import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { matchPath } from "react-router-dom";

export class ChatUtils {
  public static getChatIdFromChatUrl = () => {
    const { params } =
      matchPath("/chat/:chatId", window.location.pathname) ?? {};
    return params?.chatId;
  };

  public static constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionRequestMessage => ({
    content: msg,
    role: role || ChatCompletionRequestMessageRoleEnum.User,
  });
}
