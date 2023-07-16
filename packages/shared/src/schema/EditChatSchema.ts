import * as Yup from "yup";
import { YupShape } from "../utils/types";
import { UpdateChatRequest } from "../api/Requests/chat.requests";
import {
  chatDescriptionSchema,
  chatDisplayNameSchema,
} from "./partials/ChatSchemaPartials";
import { SchemaUtils } from "../utils";
import { Loc } from "../../loc";
import { SubscriptionTier } from "../utils/ChatUtils";

export const EditChatSchema = (tier: SubscriptionTier = "free") =>
  Yup.object<YupShape<UpdateChatRequest.UpdateFields>>().shape({
    displayName: chatDisplayNameSchema.required(
      Loc.Web.Chat.Schema.NameRequired
    ),
    description: chatDescriptionSchema(tier),
  });

export const validateChatUpdates = (tier: SubscriptionTier = "free") =>
  SchemaUtils.getValidationFunc<Partial<UpdateChatRequest.UpdateFields>>(
    EditChatSchema(tier)
  );
