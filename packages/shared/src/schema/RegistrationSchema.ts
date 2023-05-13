import * as Yup from "yup";
import { RegexUtils } from "../utils";

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string()
    .matches(
      RegexUtils.emailRegex,
      "Hmm, that email doesn't look quite right. Check the format and try again!"
    )
    .required("Don't forget your email. We need it to set up your account!"),
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
  password: Yup.string()
    .min(8, "Your password needs at least 8 characters. Let's make it secure!")
    .max(
      30,
      "Hold up, your password can't be more than 30 characters. Let's shorten it a bit!"
    )
    .matches(
      RegexUtils.passwordRegex,
      "Mix it up! Add at least 1 uppercase, 1 lowercase, and 1 number to your password."
    )
    .required(
      "Don't forget to add a password. It's important for keeping your account secure!"
    ),
  passwordConfirmation: Yup.string()
    .oneOf(
      [Yup.ref("password"), undefined],
      "Oops, your passwords don't match. Try entering them again!"
    )
    .required("Hold on, confirm your password so we know it's you!"),
});
