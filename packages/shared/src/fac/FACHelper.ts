export class FACHelper {
  public static getIsEnabled = (emails: string[], userEmail: string) =>
    emails.includes(userEmail);
}
