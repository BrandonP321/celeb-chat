import * as Yup from "yup";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";
import { SchemaUtils } from "../utils";
import { CreateChatRequest } from "../api/Requests/chat.requests";

export const CreateChatSchema = Yup.object().shape({
  displayName: chatDisplayNameSchema.required("Don't forget to add a name!"),
  description: chatDescriptionSchema,
});

export const validateCreateChatFields =
  SchemaUtils.getValidationFunc<CreateChatRequest.ReqBody>(CreateChatSchema);
