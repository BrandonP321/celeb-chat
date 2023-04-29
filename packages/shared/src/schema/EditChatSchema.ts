import * as Yup from "yup";
import { YupShape } from "../utils/types";
import { UpdateChatRequest } from "../api/Requests/chat.requests";
import { chatDisplayNameSchema } from "./partials/ChatSchemaPartials";

export const EditChatSchema = Yup.object<
  YupShape<UpdateChatRequest.UpdateFields>
>().shape({
  displayName: chatDisplayNameSchema,
});

export const validateChatUpdates = async (
  updates: Partial<UpdateChatRequest.UpdateFields>
) => {
  try {
    await EditChatSchema.validate(updates);

    return undefined;
  } catch (err) {
    const validationError = err as Yup.ValidationError;

    return validationError?.errors?.[0];
  }
};
