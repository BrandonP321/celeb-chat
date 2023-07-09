import { TRouteController } from ".";
import {
  CreateChatRequest,
  DeleteChatRequest,
  GetChatMessagesRequest,
  GetChatRequest,
  UpdateChatRequest,
} from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { TUserDocLocals, UserChatLocals } from "@/Middleware";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import db from "../models";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import {
  ChatResLocals,
  ChatWithMsgsResLocals,
} from "@/Middleware/Chat.middleware";
import {
  validateChatUpdates,
  validateCreateChatFields,
} from "@celeb-chat/shared/src/schema";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { Controller, ControllerErrors, Loc } from "@/Utils";

/** Returns a chat without its first page of messages */
export const GetChatController = Controller<
  GetChatRequest.Request,
  UserChatLocals
>(async (req, res) => {
  const { chat, userChat } = res.locals;

  res.json({ ...userChat, ...chat.toFullMessagelessJSON() }).end();
});

export const GetChatMessagesController = Controller<
  GetChatMessagesRequest.Request,
  ChatWithMsgsResLocals
>(async (req, res) => {
  const { chatId } = req.body;
  const { chat, user } = res.locals;
  const { error } = new ControllerErrors(res, GetChatMessagesRequest.Errors);

  let nextPageMarker: number | null = (chat?.messages?.[0]?.index ?? 0) - 1;

  if (nextPageMarker < 0) {
    nextPageMarker = null;
  }

  const displayName = (await user.getChatJSON(chatId))?.displayName ?? "";

  res.json({ messages: chat.messages, nextPageMarker, displayName }).end();
});

export const CreateChatController = Controller<
  CreateChatRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { error } = new ControllerErrors(res, CreateChatRequest.Errors);

  const { description, displayName } = req.body;
  const { user, userId, subscriptionTier } = res.locals;

  const validationError = await validateCreateChatFields(req.body);

  if (validationError) {
    return error.InvalidFieldInput(validationError);
  }

  if (user.chats.length >= ChatUtils.maxChatCount(subscriptionTier)) {
    return error.MaxChatLimitReached();
  }

  const newChat: ChatModel.NewChat = {
    description,
    ownerId: userId,
  };

  db.Chat.create(newChat, async (err, chat) => {
    if (err ?? !chat) {
      return error.InternalServerError(Loc.Server.Chat.CreationErr);
    }

    const newUserChat: UserModel.UserChat = {
      displayName,
      id: chat.id,
    };

    user.chats = [newUserChat, ...user.chats];

    const chatJSON = await chat.toFullChatJSON(user);

    if (!chatJSON) {
      return error.InternalServerError(
        undefined,
        Loc.Server.Chat.JSONConversionErr
      );
    }

    await user.updateChatCount();
    await user.save();

    res.json(chatJSON).end();
  });
});

export const DeleteChatController = Controller<
  DeleteChatRequest.Request,
  ChatResLocals
>(async (req, res) => {
  const { chatId } = req.body;
  const { chat, user } = res.locals;

  const { error } = new ControllerErrors(res, DeleteChatRequest.Errors);

  const isRemovedFromUser = await user.removeChat(chatId);

  if (!isRemovedFromUser) {
    return error.ErrorDeletingChat(undefined, Loc.Server.Chat.DeletionErr);
  }

  await user.updateChatCount();

  await Promise.all([chat.delete(), user.save()]);

  res.json({}).end();
});

export const UpdateChatController = Controller<
  UpdateChatRequest.Request,
  ChatResLocals
>(async (req, res) => {
  const { chatId, ...updates } = req.body;
  const { chat, user } = res.locals;

  const { error } = new ControllerErrors(res, UpdateChatRequest.Errors);

  const validationError = await validateChatUpdates(updates);

  if (validationError) {
    return error.InvalidInput(validationError);
  }

  const isChatUpdated = await chat.updateChat(user, updates);

  if (!isChatUpdated) {
    return error.ErrorUpdatingChat(undefined, Loc.Server.Chat.UpdateErr);
  }

  try {
    Promise.all([user.save(), chat.save()]);
  } catch (err) {
    return error.ErrorUpdatingChat(undefined, Loc.Server.Chat.SaveErr);
  }

  res.json({}).end();
});
