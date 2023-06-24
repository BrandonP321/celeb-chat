import * as Yup from "yup";
import { emailSchema, usernameSchema } from "./partials/AuthPartials";
import { Loc } from "../../loc";
import { SchemaUtils } from "../utils";
import { UpdateUserRequest } from "../api/Requests/user.requests";

export const EditUserSchema = Yup.object().shape({
  email: emailSchema.required(Loc.Web.Auth.SignupSchema.EmailRequired),
  username: usernameSchema.required(Loc.Web.Auth.SignupSchema.usernameRequired),
});

type ValidationInput = UpdateUserRequest.ReqBody;

export const validateEditUserInput =
  SchemaUtils.getValidationFunc<ValidationInput>(EditUserSchema);
