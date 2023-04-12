import * as Yup from "yup";
import { RegexUtils } from "../utils";

export const RegistrationSchema = Yup.object().shape({
  email: Yup.string().matches(RegexUtils.emailRegex).required(),
  username: Yup.string().min(8).max(30).required(),
  password: Yup.string()
    .min(8)
    .max(30)
    .matches(RegexUtils.passwordRegex)
    .required(),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required(),
});
