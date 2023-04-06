import {
  ChatCompletionRequestMessage,
  ChatCompletionRequestMessageRoleEnum,
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { ResponseJSON } from "../api/models";
import { ChatModel } from "../api/models/Chat.model";
import { UserModel } from "../api/models/User.model";

export type TChat = Pick<
  ChatModel.Chat,
  "createdAt" | "description" | "id" | "messages" | "ownerId"
> &
  Omit<UserModel.UserChat, "id">;

export type Message = ChatCompletionResponseMessage & {};

export class ChatUtils {
  public static constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionRequestMessage => ({
    content: msg,
    role: role || ChatCompletionRequestMessageRoleEnum.User,
  });
}
