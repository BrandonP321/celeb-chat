import * as Yup from "yup";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";
import { SchemaUtils } from "../utils";
import { CreateChatRequest } from "../api/Requests/chat.requests";
import { Loc } from "../../loc";

export const CreateChatSchema = Yup.object().shape({
  displayName: chatDisplayNameSchema.required(Loc.Web.Chat.Schema.NameRequired),
  description: chatDescriptionSchema,
});

export const validateCreateChatFields =
  SchemaUtils.getValidationFunc<CreateChatRequest.ReqBody>(CreateChatSchema);
