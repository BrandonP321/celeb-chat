import { UrlUtils } from "./UrlUtils";

export class StripeUtils {
  public static useLivePricingTable =
    process.env.REACT_APP_STRIPE_VERSION !== "test";

  private static pricingTableId = (useTestTable: boolean) =>
    useTestTable
      ? process.env.REACT_APP_PRICING_TABLE_ID_TEST
      : process.env.REACT_APP_PRICING_TABLE_ID_LIVE;

  private static pricingTablePublishableKey = (useTestTable: boolean) =>
    useTestTable
      ? process.env.REACT_APP_PRICING_TABLE_KEY_TEST
      : process.env.REACT_APP_PRICING_TABLE_KEY_LIVE;

  public static pricingTable = (useTestTable: boolean) => ({
    id: this.pricingTableId(useTestTable),
    key: this.pricingTablePublishableKey(useTestTable),
  });

  private static subscriptionManagementUrlTest =
    process.env.REACT_APP_SUBSCRIPTION_MANAGEMENT_URL_TEST;

  private static subscriptionManagementUrlLive =
    process.env.REACT_APP_SUBSCRIPTION_MANAGEMENT_URL_LIVE;

  private static subscriptionManagementUrl = (useTestStripe: boolean) =>
    useTestStripe
      ? this.subscriptionManagementUrlTest
      : this.subscriptionManagementUrlLive;

  public static getSubscriptionManagementUrl = (
    useTest: boolean,
    prefilledEmail?: string
  ) => {
    const url = this.subscriptionManagementUrl(useTest);

    return UrlUtils.url(url).addParam({
      key: "prefilled_email",
      value: prefilledEmail ?? "",
    }).href;
  };
}
