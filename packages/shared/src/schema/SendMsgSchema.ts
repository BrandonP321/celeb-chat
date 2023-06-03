import * as Yup from "yup";
import { ChatUtils } from "../utils/ChatUtils";
import { SchemaUtils } from "../utils";
import { Loc } from "../../loc";

export const SendMsgSchema = Yup.object().shape({
  msgBody: Yup.string()
    .max(
      ChatUtils.maxMsgCharCount,
      Loc.Server.Msg.Schema.msgMaxLength(ChatUtils.maxMsgCharCount)
    )
    .required(Loc.Server.Msg.Schema.msgRequired),
});

export const validateMsg = SchemaUtils.getValidationFunc<{ msgBody: string }>(
  SendMsgSchema
);
