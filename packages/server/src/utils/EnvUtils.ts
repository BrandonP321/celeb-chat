export class EnvUtils {
  public static prod = process.env.ENV === "prod";
  public static dev = process.env.ENV === "dev";
  public static local =
    process.env.ENV === "local" || (!this.prod && !this.dev);
}
