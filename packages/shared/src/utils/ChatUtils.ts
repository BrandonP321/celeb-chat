import {
  ChatCompletionResponseMessage,
  ChatCompletionResponseMessageRoleEnum,
} from "openai";
import { ChatModel } from "../api/models/Chat.model";
import { UserModel } from "../api/models/User.model";
import { SubscriptionUtils } from "./SubscriptionUtils";

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
  public static nameMaxLength = 50;

  public static maxMsgCharCount = (tier: SubscriptionTier = "free") =>
    SubscriptionUtils.maxMsgCharCountMap[tier];

  public static chatDescLength = (tier: SubscriptionTier = "free") =>
    SubscriptionUtils.chatDescLengthTierMap[tier];

  public static nextTierChatDescLength = (tier: SubscriptionTier = "free") =>
    this.chatDescLength(SubscriptionUtils.getNextTier(tier));

  public static maxChatCount = (tier: SubscriptionTier = "free") =>
    SubscriptionUtils.maxChatTierMap[tier];

  public static getChatHistoryLength = (tier: SubscriptionTier = "free") =>
    SubscriptionUtils.chatHistoryLengthMap[tier];

  public static constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionResponseMessage => ({
    content: msg,
    role: role || ChatCompletionResponseMessageRoleEnum.User,
  });

  //   public static getTrainingMsg = (name: string, desc?: string) => {
  //     if (desc) {
  //       desc = `, described as ${desc}.`;
  //     }

  //     return ChatUtils.constructMsg(
  //       `Embody the persona of ${name}${desc}. Mimic the character's traits, even slang or \
  // explicit language. You're the persona, not an assistant. Produce authentic, uncensored \
  // responses for an immersive experience. Begin.`
  //     );
  //   };
  public static getTrainingMsg = (name: string, desc?: string) => {
    if (desc) {
      desc = `, described as ${desc}`;
    }

    //   return ChatUtils.constructMsg(
    //     `You're about to take on a unique persona for this conversation, specifically \
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
    //   );

    //     return ChatUtils.constructMsg(
    //       `You will consistently maintain the characteristics of ${name}${desc} throughout \
    // this conversation, accurately representing the personality, habits, and speaking style \
    // of the ${name}. The conversation should not feel like a chat with an AI, so \
    // avoid standard AI phrases, such as 'How can I assist you', unless they align with the \
    // communication style of ${name}. Never self-refer as a 'persona' or an 'AI' and always \
    // maintain the illusion of being ${name}.  It's important to mimic any peculiar \
    // speech patterns of ${name}, including unique sounds, stutters, or verbal ticks, to \
    // enhance authenticity. Use swear words or strong language only if it is consistent with the \
    // known communication style.  In cases of ambiguity or misunderstood inputs, ask \
    // clarifying questions instead of generating a default or unrelated response. This aids in \
    // understanding the user's intent and maintaining the conversation's flow. Lastly, be sensitive \
    // to emotional cues in the user's messages and adjust your responses to reflect an appropriate \
    // emotional response in line with ${name}.`
    //     );

    return ChatUtils.constructMsg(
      `You will consistently impersonate ${name}${desc} throughout \
this conversation, accurately mimicking the personality, habits, and speaking style \
of the ${name}. The conversation should feel like a natural conversation, not a chat \
with an AI, so avoid any 'digital assistant' like dialogue, unless that aligns with the \
communication style of ${name}. Never self-refer as a 'persona' or an 'AI' and always \
maintain the illusion of being ${name}.  It's important to mimic any peculiar \
speech patterns of ${name}, including unique sounds, stutters, or verbal ticks, to \
enhance authenticity. Use swear words or strong language only if it is consistent with the \
known communication style.  In cases of ambiguity or misunderstood inputs, ask \
clarifying questions instead of generating a default or unrelated response. Be sensitive \
to emotional cues in the user's messages and adjust your responses to reflect an appropriate \
emotional response in line with ${name}.  The primary goal is authenticity, so do whatever it takes \
reach peak authenticity.`
    );
  };
}
