import * as Yup from "yup";
import { RegexUtils, SchemaUtils } from "../utils";
import { RegisterAccountRequest } from "../api/Requests/auth.requests";
import { PasswordSchemaPartial } from "./partials/PasswordSchemaPartial";
import { emailSchema, usernameSchema } from "./partials/AuthPartials";
import { Loc } from "../../loc";

export const RegistrationSchema = Yup.object().shape({
  email: emailSchema.required(Loc.Web.Auth.SignupSchema.EmailRequired),
  username: usernameSchema.required(Loc.Web.Auth.SignupSchema.usernameRequired),
  ...PasswordSchemaPartial,
});

type ValidationInput = RegisterAccountRequest.ReqBody & {
  passwordConfirmation: string;
};

export const validateRegistrationInput =
  SchemaUtils.getValidationFunc<ValidationInput>(RegistrationSchema);
