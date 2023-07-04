import { UrlUtils } from "./UrlUtils";

export class StripeUtils {
  public static useLivePricingTable =
    process.env.REACT_APP_STRIPE_VERSION !== "test";

  private static pricingTableId = this.useLivePricingTable
    ? process.env.REACT_APP_PRICING_TABLE_ID_LIVE
    : process.env.REACT_APP_PRICING_TABLE_ID_TEST;

  private static pricingTablePublishableKey = this.useLivePricingTable
    ? process.env.REACT_APP_PRICING_TABLE_KEY_LIVE
    : process.env.REACT_APP_PRICING_TABLE_KEY_TEST;

  public static pricingTable = {
    id: this.pricingTableId,
    key: this.pricingTablePublishableKey,
  };

  private static subscriptionManagementUrlTest =
    process.env.REACT_APP_SUBSCRIPTION_MANAGEMENT_URL_TEST;

  private static subscriptionManagementUrlLive =
    process.env.REACT_APP_SUBSCRIPTION_MANAGEMENT_URL_LIVE;

  private static subscriptionManagementUrl = this.useLivePricingTable
    ? this.subscriptionManagementUrlLive
    : this.subscriptionManagementUrlTest;

  public static getSubscriptionManagementUrl = (prefilledEmail?: string) => {
    const url = this.subscriptionManagementUrl;

    return UrlUtils.url(url).addParam({
      key: "prefilled_email",
      value: prefilledEmail ?? "",
    }).href;
  };
}
