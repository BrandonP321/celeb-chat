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
import { ControllerErrors } from "utils/ControllerUtils";
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

/** Returns a chat without its first page of messages */
export const GetChatController: TRouteController<
  GetChatRequest.Request,
  UserChatLocals
> = async (req, res) => {
  const { error } = new ControllerErrors(res, GetChatRequest.Errors);

  try {
    const { chat, userChat } = res.locals;

    res.json({ ...userChat, ...chat.toFullMessagelessJSON() }).end();
  } catch (err) {
    return error.InternalServerError();
  }
};

export const GetChatMessagesController: TRouteController<
  GetChatMessagesRequest.Request,
  ChatWithMsgsResLocals
> = async (req, res) => {
  const { chatId } = req.body;
  const { chat, user } = res.locals;

  const { error } = new ControllerErrors(res, GetChatMessagesRequest.Errors);

  try {
    let nextPageMarker: number | null = (chat?.messages?.[0]?.index ?? 0) - 1;

    if (nextPageMarker < 0) {
      nextPageMarker = null;
    }

    const displayName = (await user.getChatJSON(chatId))?.displayName ?? "";

    res.json({ messages: chat.messages, nextPageMarker, displayName }).end();
  } catch (err) {
    return error.InternalServerError();
  }
};

export const CreateChatController: TRouteController<
  CreateChatRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  const { error } = new ControllerErrors(res, CreateChatRequest.Errors);

  try {
    const { description, displayName } = req.body;
    const { user, userId } = res.locals;

    const validationError = await validateCreateChatFields(req.body);

    if (validationError) {
      return error.InvalidFieldInput(validationError);
    }

    if (user.chats.length >= ChatUtils.maxChatCount) {
      return error.MaxChatLimitReached();
    }

    const newChat: ChatModel.NewChat = {
      description,
      ownerId: userId,
    };

    db.Chat.create(newChat, async (err, chat) => {
      if (err ?? !chat) {
        return error.InternalServerError(
          "An error occurred while creating a new chat"
        );
      }

      const newUserChat: UserModel.UserChat = {
        displayName,
        id: chat.id,
      };

      user.chats = [newUserChat, ...user.chats];

      const chatJSON = await chat.toFullChatJSON(user);

      if (!chatJSON) {
        return error.InternalServerError();
      }

      await user.save();

      res.json(chatJSON).end();
    });
  } catch (err) {
    return error.InternalServerError();
  }
};

export const DeleteChatController: TRouteController<
  DeleteChatRequest.Request,
  ChatResLocals
> = async (req, res) => {
  const { chatId } = req.body;
  const { chat, user } = res.locals;

  const { error } = new ControllerErrors(res, DeleteChatRequest.Errors);

  try {
    const isRemovedFromUser = await user.removeChat(chatId);

    if (!isRemovedFromUser) {
      return error.ErrorDeletingChat();
    }

    Promise.all([chat.delete(), user.save()]);

    res.json({}).end();
  } catch (err) {
    return error.ErrorDeletingChat();
  }
};

export const UpdateChatController: TRouteController<
  UpdateChatRequest.Request,
  ChatResLocals
> = async (req, res) => {
  const { chatId, ...updates } = req.body;
  const { chat, user } = res.locals;

  const { error } = new ControllerErrors(res, UpdateChatRequest.Errors);

  try {
    const validationError = await validateChatUpdates(updates);

    if (validationError) {
      return error.ErrorUpdatingChat(validationError);
    }

    const isChatUpdated = await chat.updateChat(user, updates);

    if (!isChatUpdated) {
      return error.ErrorUpdatingChat();
    }

    try {
      Promise.all([user.save(), chat.save()]);
    } catch (err) {
      return error.ErrorUpdatingChat();
    }

    res.json({}).end();
  } catch (err) {
    return error.ErrorUpdatingChat();
  }
};
