import * as Yup from "yup";
import { RegexUtils } from "../../utils";
import { Loc } from "../../../loc";

const nameMaxLength = 30;
const descMaxLength = 200;

export const chatDisplayNameSchema = Yup.string()
  .max(nameMaxLength, Loc.Web.Chat.Schema.NameMaxLength(nameMaxLength))
  .matches(RegexUtils.chatNameRegex, Loc.Web.Chat.Schema.NameRegexMatch);
export const chatDescriptionSchema = Yup.string()
  .max(descMaxLength, Loc.Web.Chat.Schema.DescMaxLength(descMaxLength))
  .matches(RegexUtils.chatDescRegex, Loc.Web.Chat.Schema.NameRegexMatch);
