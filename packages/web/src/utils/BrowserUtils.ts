export class BrowserUtils {
  public static isTouchDevice = window.matchMedia("(any-hover: none)").matches;
}
