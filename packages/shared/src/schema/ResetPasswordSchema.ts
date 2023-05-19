import * as Yup from "yup";
import { PasswordSchemaPartial } from "./partials/PasswordSchemaPartial";
import { SchemaUtils } from "../utils";
import { ResetPasswordRequest } from "../api/Requests/user.requests";

export const NewPasswordSchema = Yup.object().shape({
  ...PasswordSchemaPartial,
});

export const ResetPasswordSchema = Yup.object().shape({
  ...PasswordSchemaPartial,

  // TODO: Add error strings
  confirmationId: Yup.string().required(),
  confirmationHash: Yup.string().required(),
});

export const validatePasswordResetInput =
  SchemaUtils.getValidationFunc<ResetPasswordRequest.Request["ReqBody"]>(
    ResetPasswordSchema
  );
