import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { SubscriptionTier } from "@celeb-chat/shared/src/utils/ChatUtils";

export class StripeUtils {
  public static useLiveStripeVersion = process.env.STRIPE_VERSION !== "test";

  private static apiKeys = {
    test: process.env.STRIPE_API_KEY_TEST,
    live: process.env.STRIPE_API_KEY_LIVE,
  };

  public static apiKey =
    (this.useLiveStripeVersion ? this.apiKeys.live : this.apiKeys.test) ?? "";

  private static testProductTierIDs = {
    free: process.env.STRIPE_TEST_PRODUCT_TIER_FREE,
    two: process.env.STRIPE_TEST_PRODUCT_TIER_TWO,
    three: process.env.STRIPE_TEST_PRODUCT_TIER_THREE,
  };

  private static liveProductTierIDs = {
    free: process.env.STRIPE_LIVE_PRODUCT_TIER_FREE,
    two: process.env.STRIPE_LIVE_PRODUCT_TIER_TWO,
    three: process.env.STRIPE_LIVE_PRODUCT_TIER_THREE,
  };

  private static testPriceTierIDs = {
    free: process.env.STRIPE_TEST_PRICE_TIER_FREE,
    two: process.env.STRIPE_TEST_PRICE_TIER_TWO,
    three: process.env.STRIPE_TEST_PRICE_TIER_THREE,
  };

  private static livePriceTierIDs = {
    free: process.env.STRIPE_LIVE_PRICE_TIER_FREE,
    two: process.env.STRIPE_LIVE_PRICE_TIER_TWO,
    three: process.env.STRIPE_LIVE_PRICE_TIER_THREE,
  };

  public static priceTierIDs = this.useLiveStripeVersion
    ? this.livePriceTierIDs
    : this.testPriceTierIDs;

  public static allProductIds = [
    ...Object.values(this.testProductTierIDs),
    ...Object.values(this.liveProductTierIDs),
  ];

  public static productTierIDs = this.useLiveStripeVersion
    ? this.liveProductTierIDs
    : this.testProductTierIDs;

  /** Product IDs ordered by price */
  public static orderedProductIds = [
    this.productTierIDs.free,
    this.productTierIDs.two,
    this.productTierIDs.three,
  ];

  public static orderedTiers: SubscriptionTier[] = ["free", "two", "three"];

  /** Checks if product a is greater than product b */
  public static isProductGreaterThan = (a: string, b: string) => {
    const aIndex = this.orderedProductIds.findIndex((v) => v === a);
    const bIndex = this.orderedProductIds.findIndex((v) => v === b);

    return aIndex > bIndex;
  };

  public static getSubscriptionTier = (user: UserModel.User) => {
    let highestTierWithAccess: SubscriptionTier = "free";

    this.orderedTiers.forEach((tier) => {
      const userSubTier = user.subscription?.plans?.[tier];

      if (
        userSubTier &&
        user.subscription.isActive &&
        Math.round(Date.now() / 1000) <= userSubTier.accessExpirationDate
      ) {
        highestTierWithAccess = tier;
      }
    });

    return highestTierWithAccess;
  };

  public static getSubTierName = (productId: string) => {
    let tierName: SubscriptionTier | null = null;

    let tier: SubscriptionTier;
    for (tier in this.productTierIDs) {
      if (this.productTierIDs[tier] === productId) {
        tierName = tier;
        break;
      }
    }

    return tierName ?? "free";
  };
}
