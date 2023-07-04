import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";

export class StripeUtils {
  public static useLiveStripeVersion = process.env.STRIPE_VERSION !== "test";

  private static apiKeys = {
    test: process.env.STRIPE_API_KEY_TEST,
    live: process.env.STRIPE_API_KEY_LIVE,
  };

  public static apiKey = this.useLiveStripeVersion
    ? this.apiKeys.live
    : this.apiKeys.test;

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

  public static productTierIDs = this.useLiveStripeVersion
    ? this.liveProductTierIDs
    : this.testProductTierIDs;

  //   public static getSubscriptionTier = (user: UserModel.Document) => {
  //     const { tier } = user.subscription;

  //     const tierStatus = {
  //       free: false,
  //       two: false,
  //       three: false,
  //     };

  //     switch (tier) {
  //       case this.productTierIDs.two:
  //         tierStatus.two = true;
  //         break;
  //       case this.productTierIDs.three:
  //         tierStatus.three = true;
  //         break;
  //       default:
  //         tierStatus.free = true;
  //     }

  //     return tierStatus;
  //   };
}
