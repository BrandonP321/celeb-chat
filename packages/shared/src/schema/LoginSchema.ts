import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required(
    "Looks like you forgot your email or username . Fill it in to continue!"
  ),
  password: Yup.string().required(
    "Oops, you skipped the password. We need that to log you in!"
  ),
});
