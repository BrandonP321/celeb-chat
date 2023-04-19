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
