import * as Yup from "yup";
import { RegexUtils } from "../../utils";
import { Loc } from "../../../loc";
import { ChatUtils, SubscriptionTier } from "../../utils/ChatUtils";

export const chatDisplayNameSchema = Yup.string()
  .max(
    ChatUtils.nameMaxLength,
    Loc.Web.Chat.Schema.NameMaxLength(ChatUtils.nameMaxLength)
  )
  .matches(RegexUtils.chatNameRegex, Loc.Web.Chat.Schema.NameRegexMatch);
export const chatDescriptionSchema = (tier: SubscriptionTier) =>
  Yup.string()
    .max(
      ChatUtils.chatDescLength(tier),
      Loc.Web.Chat.Schema.DescMaxLength(ChatUtils.chatDescLength(tier))
    )
    .matches(RegexUtils.chatDescRegex, Loc.Web.Chat.Schema.NameRegexMatch);
