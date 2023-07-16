import * as Yup from "yup";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";
import { SchemaUtils } from "../utils";
import { CreateChatRequest } from "../api/Requests/chat.requests";
import { Loc } from "../../loc";
import { SubscriptionTier } from "../utils/ChatUtils";

export const CreateChatSchema = (tier: SubscriptionTier = "free") =>
  Yup.object().shape({
    displayName: chatDisplayNameSchema.required(
      Loc.Web.Chat.Schema.NameRequired
    ),
    description: chatDescriptionSchema(tier),
  });

export const validateCreateChatFields = (tier: SubscriptionTier = "free") =>
  SchemaUtils.getValidationFunc<CreateChatRequest.ReqBody>(
    CreateChatSchema(tier)
  );
