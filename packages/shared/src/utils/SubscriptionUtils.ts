import { SubScriptionTierMap } from "./ChatUtils";

export class SubscriptionUtils {
  /** Max number of chats the user can maintain */
  public static maxChatTierMap: SubScriptionTierMap<number> = {
    free: 1,
    two: 5,
    three: 10,
  };

  /** Max message length */
  public static maxMsgCharCountMap: SubScriptionTierMap<number> = {
    free: 250,
    two: 300,
    three: 400,
  };

  /** Number of previous message to send to OpenAI with each request */
  public static chatHistoryLengthMap: SubScriptionTierMap<number> = {
    free: 1,
    two: 10,
    three: 20,
  };

  public static maxMonthlyFeaturedChatsTierMap: SubScriptionTierMap<
    number | undefined
  > = {
    free: 2,
    two: 10,
    three: undefined,
  };
}
