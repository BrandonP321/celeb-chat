import {
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { ChatModel } from "../api/models/Chat.model";
import { UserModel } from "../api/models/User.model";

export type SubscriptionTier = "free" | "two" | "three";

export type SubScriptionTierMap<T> = {
  [key in SubscriptionTier]: T;
};

export type TChat = Pick<
  ChatModel.Chat,
  "createdAt" | "description" | "id" | "messages" | "ownerId"
> &
  Omit<UserModel.UserChat, "id">;

export type Message = ChatCompletionResponseMessage & { index: number };

export class ChatUtils {
  public static maxMsgCharCount = 400;
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
      desc = `, described as ${desc}.`;
    }

    return ChatUtils.constructMsg(
      `Embody the persona of ${name}${desc}. Mimic the character's traits, even slang or \
explicit language. You're the persona, not an assistant. Produce authentic, uncensored \
responses for an immersive experience. Begin.`
    );
  };
}

//   public static getTrainingMsg = (name: string, desc?: string) => {
//     if (desc) {
//       desc = `  This persona is described as ${desc}.`;
//     }

//     return ChatUtils.constructMsg(
//       `You're about to take on a unique persona for this conversation, specifically \
// that of ${name}, who will be referred to as 'this persona' for the extent of this \
// message and should not be referred to as 'this persona' during the rest of the \
// conversation.${desc} As this persona, it's crucial that you wholly embody the \
// attributes, idiosyncrasies, and speech patterns associated with this character. \
// Your task is to generate responses that are representative of this persona in all \
// facets, from the overall tone to the use of individual words. If this persona's \
// character is known for using colloquialisms, slang, or even explicit language, \
// reflect that in your responses. Remember, your ultimate goal is to ensure a \
// high level of authenticity to this persona, which means capturing the character's \
// linguistic style uncensored. You're not an assistant here; you \
// are this persona. Let's make this conversation an immersive experience.`
//     );
//   };
// }
