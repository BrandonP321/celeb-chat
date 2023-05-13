import * as Yup from "yup";
import { ChatUtils } from "../utils/ChatUtils";
import { SchemaUtils } from "../utils";

export const SendMsgSchema = Yup.object().shape({
  msgBody: Yup.string()
    .max(
      ChatUtils.maxMsgCharCount,
      `Whoa, that's a long one! Keep your message under ${ChatUtils.maxMsgCharCount} characters, please.`
    )
    .required(
      "Don't leave them hanging! Add a message to continue the conversation."
    ),
});

export const validateMsg = SchemaUtils.getValidationFunc<{ msgBody: string }>(
  SendMsgSchema
);
