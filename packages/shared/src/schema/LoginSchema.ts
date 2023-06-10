import * as Yup from "yup";
import { Loc } from "../../loc";

export const LoginSchema = Yup.object().shape({
  emailOrUsername: Yup.string().required(
    Loc.Web.Auth.LoginSchema.EmailOrUsernameRequired
  ),
  password: Yup.string().required(Loc.Web.Auth.LoginSchema.PasswordRequired),
});
