import * as Yup from "yup";
import { Loc } from "../../../loc";

export const emailSchema = Yup.string().email(Loc.Web.Auth.InvalidEmail);
