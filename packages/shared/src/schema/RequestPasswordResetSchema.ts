import * as Yup from "yup";
import { emailSchema } from "./partials/AuthPartials";

export const RequestPasswordResetSchema = Yup.object().shape({
  email: emailSchema.required(
    "Looks like you forgot your email. Fill it in to continue!"
  ),
});
