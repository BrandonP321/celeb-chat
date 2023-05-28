import * as Yup from "yup";
import { RegexUtils, SchemaUtils } from "../utils";
import { RegisterAccountRequest } from "../api/Requests/auth.requests";
import { PasswordSchemaPartial } from "./partials/PasswordSchemaPartial";
import { emailSchema } from "./partials/AuthPartials";

const usernameMinLength = 8;
const usernameMaxLength = 30;

export const RegistrationSchema = Yup.object().shape({
  email: emailSchema.required(
    "Don't forget your email. We need it to set up your account!"
  ),
  username: Yup.string()
    .min(
      usernameMinLength,
      `Your username needs to be at least ${usernameMinLength} characters long. Add a few more!`
    )
    .max(
      30,
      `Whoa there, that's a long one! Keep your username under ${usernameMaxLength} characters, please.`
    )
    .matches(
      RegexUtils.alphaNumeric,
      "Oops! Usernames can only include uppercase letters, lowercase letters, and numbers. No special characters allowed!"
    )
    .required("Let's get creative! Give us a username to continue."),
  ...PasswordSchemaPartial,
});

type ValidationInput = RegisterAccountRequest.ReqBody & {
  passwordConfirmation: string;
};

export const validateRegistrationInput =
  SchemaUtils.getValidationFunc<ValidationInput>(RegistrationSchema);
