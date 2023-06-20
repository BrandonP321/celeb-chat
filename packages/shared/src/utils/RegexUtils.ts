export class RegexUtils {
  public static emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  /** Regex for password that contains a min of 8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number */
  public static passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
  public static phoneRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  public static usernameMinLength = 5;
  public static usernameMaxLength = 15;
  public static alphaNumeric = /^[a-zA-Z0-9]*$/;

  public static chatNameRegex = /^[^"]*$/;
  public static chatDescRegex = /^[^"]*$/;
}
