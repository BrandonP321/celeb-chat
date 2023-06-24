import * as Yup from "yup";
import { Loc } from "../../../loc";
import { RegexUtils } from "../../utils";

export const emailSchema = Yup.string().email(Loc.Web.Auth.InvalidEmail);

const usernameMinLength = 8;
const usernameMaxLength = 30;

export const usernameSchema = Yup.string()
  .min(
    usernameMinLength,
    Loc.Web.Auth.SignupSchema.UsernameMinLength(usernameMinLength)
  )
  .max(30, Loc.Web.Auth.SignupSchema.usernameMaxLength(usernameMaxLength))
  .matches(RegexUtils.alphaNumeric, Loc.Web.Auth.SignupSchema.usernameRegex);
