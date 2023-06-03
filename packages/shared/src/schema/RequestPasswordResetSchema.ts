import * as Yup from "yup";
import { emailSchema } from "./partials/AuthPartials";
import { Loc } from "../../loc";

export const RequestPasswordResetSchema = Yup.object().shape({
  email: emailSchema.required(Loc.Web.RequestPassReset.Schema.EmailRequired),
});
