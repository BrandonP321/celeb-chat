const allowedAccounts: string[] = [
  "bphillips@personaverse.com",
  "dsandbak@personaverse.com",
  "sandbak15@gmail.com",
  "brandon.phillips@bhillips.dev",
  "gpiampanichwat@gmail.com",
];

export class FACHelper {
  public static allowedAccounts = allowedAccounts;

  public static getIsEnabled = (userEmail: string) =>
    this.allowedAccounts.includes(userEmail);

  public static isAllowedAccount = (userEmail?: string) =>
    !!userEmail && this.allowedAccounts.includes(userEmail);
}
