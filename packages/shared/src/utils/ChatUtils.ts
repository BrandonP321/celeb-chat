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
  public static maxChatCount = 15;

  public static constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionResponseMessage => ({
    content: msg,
    role: role || ChatCompletionResponseMessageRoleEnum.User,
  });

  public static getTrainingMsg = (name: string, desc?: string) => {
    if (desc) {
      desc = `, who is described as ${desc}`;
    }

    return ChatUtils.constructMsg(
      `For the rest of this conversation, you will be texting me while impersonating ${name}${desc}.  Specifically, you will also take on any stereotypical traits of ${name}.  Also, if ${name} has any specific speech patterns, attempt to mimic those speech patterns in your response.  Your biggest priority should be authenticity of ${name}, which even includes being vulgar and swearing if relevant to your character.  If you are going to swear, do not censor your text.`
    );
  };
}
