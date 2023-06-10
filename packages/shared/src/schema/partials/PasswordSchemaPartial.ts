import * as Yup from "yup";
import { RegexUtils } from "../../utils";
import { Loc } from "../../../loc";

const passwordMinLength = 8;
const passwordMaxLength = 100;

export const PasswordSchemaPartial = {
  password: Yup.string()
    .min(8, Loc.Web.Auth.Schema.PassMinLength(passwordMinLength))
    .max(30, Loc.Web.Auth.Schema.PassMaxLength(passwordMaxLength))
    .matches(RegexUtils.passwordRegex, Loc.Web.Auth.Schema.PassRegexMatch)
    .required(Loc.Web.Auth.Schema.PassRequired),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), undefined],
      Loc.Web.Auth.Schema.PassConfirmNoMatch
    )
    .required(Loc.Web.Auth.Schema.PassConfirmRequired),
};
