import * as Yup from "yup";
import { YupShape } from "../utils/types";
import { UpdateChatRequest } from "../api/Requests/chat.requests";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";
import { SchemaUtils } from "../utils";

export const EditChatSchema = Yup.object<
  YupShape<UpdateChatRequest.UpdateFields>
>().shape({
  displayName: chatDisplayNameSchema.required(),
  description: chatDescriptionSchema,
});

export const validateChatUpdates =
  SchemaUtils.getValidationFunc<Partial<UpdateChatRequest.UpdateFields>>(
    EditChatSchema
  );
