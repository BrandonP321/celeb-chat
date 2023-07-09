import * as Yup from "yup";
import { ChatUtils, SubscriptionTier } from "../utils/ChatUtils";
import { SchemaUtils } from "../utils";
import { Loc } from "../../loc";

export const SendMsgSchema = (tier: SubscriptionTier = "free") =>
  Yup.object().shape({
    msgBody: Yup.string()
      .max(
        ChatUtils.maxMsgCharCount(tier),
        Loc.Server.Msg.Schema.msgMaxLength(ChatUtils.maxMsgCharCount(tier))
      )
      .required(Loc.Server.Msg.Schema.msgRequired),
  });

export const validateMsg = (tier: SubscriptionTier = "free") =>
  SchemaUtils.getValidationFunc<{ msgBody: string }>(SendMsgSchema(tier));
