import {
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { ChatModel } from "../api/models/Chat.model";
import { UserModel } from "../api/models/User.model";

export type TChat = Pick<
  ChatModel.Chat,
  "createdAt" | "description" | "id" | "messages" | "ownerId"
> &
  Omit<UserModel.UserChat, "id">;

export type Message = ChatCompletionResponseMessage & { index: number };

export class ChatUtils {
  public static maxMsgCharCount = 100;
  public static maxChatCount = 5;

  public static constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionResponseMessage => ({
    content: msg,
    role: role || ChatCompletionResponseMessageRoleEnum.User,
  });

  public static getTrainingMsg = (character: string) =>
    ChatUtils.constructMsg(
      `For the rest of this conversation, you will be texting me while impersonating ${character}.  Specifically, you will also take on any stereotypical traits of ${character}.  Also, if ${character} has any specific speech patterns, attempt to mimic those speech patterns in your response.`
    );
}
