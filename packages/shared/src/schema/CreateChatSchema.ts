import * as Yup from "yup";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";

export const CreateChatSchema = Yup.object().shape({
  displayName: chatDisplayNameSchema.required(),
  description: chatDescriptionSchema.required(),
});
