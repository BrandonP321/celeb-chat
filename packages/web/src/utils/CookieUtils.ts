import Cookie from "js-cookie";

type ComplianceCookieBody = { accepted: boolean };

export class CookieUtils {
  private static complianceCookieKey = "userCookieCompliance";

  public static get = <T>(key: string, parse?: boolean): T | undefined => {
    try {
      let data: any = Cookie.get(key);

      data = parse && data ? JSON.parse(data) : data;

      return data;
    } catch (err) {
      return undefined;
    }
  };

  public static set = <T>(key: string, value: T) => {
    Cookie.set(key, typeof value === "string" ? value : JSON.stringify(value));
  };

  public static getComplianceCookie = () =>
    this.get<ComplianceCookieBody>(this.complianceCookieKey, true);

  public static setComplianceCookie = (params: ComplianceCookieBody) =>
    Cookie.set(this.complianceCookieKey, JSON.stringify(params));

  public static setUserHasSeenCookiePopup = () =>
    this.setComplianceCookie({ accepted: true });

  public static getHasUserDismissedCookiePopup = () =>
    !!this.getComplianceCookie()?.accepted;
}
