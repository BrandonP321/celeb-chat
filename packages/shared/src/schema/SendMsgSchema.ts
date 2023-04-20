import * as Yup from "yup";
import { ChatUtils } from "../utils/ChatUtils";

export const SendMsgSchema = Yup.object().shape({
  msgBody: Yup.string()
    .max(
      ChatUtils.maxMsgCharCount,
      `Message must be at most ${ChatUtils.maxMsgCharCount} characters long`
    )
    .required(),
});

export const validateMsg = async (msgBody: string) => {
  try {
    await SendMsgSchema.validate({ msgBody });

    return undefined;
  } catch (err) {
    const validationError = err as Yup.ValidationError;

    return validationError?.errors?.[0];
  }
};
