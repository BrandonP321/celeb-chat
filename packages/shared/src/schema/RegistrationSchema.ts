import * as Yup from "yup";
import { RegexUtils, SchemaUtils } from "../utils";
import { RegisterAccountRequest } from "../api/Requests/auth.requests";
import { PasswordSchemaPartial } from "./partials/PasswordSchemaPartial";
import { emailSchema } from "./partials/AuthPartials";
import { Loc } from "../../loc";

const usernameMinLength = 8;
const usernameMaxLength = 30;

export const RegistrationSchema = Yup.object().shape({
  email: emailSchema.required(Loc.Web.Auth.SignupSchema.EmailRequired),
  username: Yup.string()
    .min(
      usernameMinLength,
      Loc.Web.Auth.SignupSchema.UsernameMinLength(usernameMinLength)
    )
    .max(30, Loc.Web.Auth.SignupSchema.usernameMaxLength(usernameMaxLength))
    .matches(RegexUtils.alphaNumeric, Loc.Web.Auth.SignupSchema.usernameRegex)
    .required(Loc.Web.Auth.SignupSchema.usernameRequired),
  ...PasswordSchemaPartial,
});

type ValidationInput = RegisterAccountRequest.ReqBody & {
  passwordConfirmation: string;
};

export const validateRegistrationInput =
  SchemaUtils.getValidationFunc<ValidationInput>(RegistrationSchema);
