import * as Yup from "yup";
import { SchemaUtils } from "../utils";
import { RegisterAccountRequest } from "../api/Requests/auth.requests";
import { PasswordSchemaPartial } from "./partials/PasswordSchemaPartial";
import { emailSchema } from "./partials/AuthPartials";

export const RegistrationSchema = Yup.object().shape({
  email: emailSchema.required(
    "Don't forget your email. We need it to set up your account!"
  ),
  username: Yup.string()
    .min(
      8,
      "Your username needs to be at least 8 characters long. Add a few more!"
    )
    .max(
      30,
      "Whoa there, that's a long one! Keep your username under 30 characters, please."
    )
    .required("Let's get creative! Give us a username to continue."),
  ...PasswordSchemaPartial,
});

type ValidationInput = RegisterAccountRequest.ReqBody & {
  passwordConfirmation: string;
};

export const validateRegistrationInput =
  SchemaUtils.getValidationFunc<ValidationInput>(RegistrationSchema);
