import { SubScriptionTierMap, SubscriptionTier } from "./ChatUtils";

export class SubscriptionUtils {
  public static getNextTier = (
    currentTier: SubscriptionTier = "free"
  ): SubscriptionTier | undefined => {
    switch (currentTier) {
      case "free":
        return "two";
      case "two":
        return "three";
      case "three":
        return undefined;
      default:
        return "two";
    }
  };

  public static tierNameMap: SubScriptionTierMap<string> = {
    free: "Explorer Plan",
    two: "Journeyman Plan",
    three: "Zenith Plan",
  };

  public static getTierName = (tier: SubscriptionTier = "free") =>
    this.tierNameMap[tier];

  /** Max number of chats the user can maintain */
  public static maxChatTierMap: SubScriptionTierMap<number> = {
    free: 1,
    two: 5,
    three: 10,
  };

  /** Max message length */
  public static maxMsgCharCountMap: SubScriptionTierMap<number> = {
    free: 250,
    two: 350,
    three: 450,
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

  public static chatDescLengthTierMap: SubScriptionTierMap<number> = {
    free: 100,
    two: 200,
    three: 400,
  };
}
