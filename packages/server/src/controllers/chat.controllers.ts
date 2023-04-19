import { TRouteController } from ".";
import {
  CreateChatRequest,
  DeleteChatRequest,
  GetChatMessagesRequest,
  GetChatRequest,
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

const getChatErrors = new ControllerErrors(GetChatRequest.Errors);

/** Returns a chat without its first page of messages */
export const GetChatController: TRouteController<
  GetChatRequest.Request,
  UserChatLocals
> = async (req, res) => {
  try {
    const { chat, userChat } = res.locals;

    res.json({ ...userChat, ...chat.toFullMessagelessJSON() }).end();
  } catch (err) {
    return getChatErrors.error.InternalServerError(res);
  }
};

const getMessagesErrors = new ControllerErrors(GetChatMessagesRequest.Errors);

export const GetChatMessagesController: TRouteController<
  GetChatMessagesRequest.Request,
  ChatWithMsgsResLocals
> = async (req, res) => {
  const { chat } = res.locals;

  try {
    let nextPageMarker: number | null = (chat?.messages?.[0]?.index ?? 0) - 1;

    if (nextPageMarker < 0) {
      nextPageMarker = null;
    }

    res.json({ messages: chat.messages, nextPageMarker }).end();
  } catch (err) {
    return getMessagesErrors.error.InternalServerError(res);
  }
};

const createChatErrors = new ControllerErrors(CreateChatRequest.Errors);

export const CreateChatController: TRouteController<
  CreateChatRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  try {
    const { description, displayName } = req.body;
    const { user, userId } = res.locals;

    const newChat: ChatModel.NewChat = {
      description,
      ownerId: userId,
    };

    db.Chat.create(newChat, async (err, chat) => {
      if (err ?? !chat) {
        return createChatErrors.error.InternalServerError(
          res,
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
        return createChatErrors.error.InternalServerError(res);
      }

      await user.save();

      res.json(chatJSON).end();
    });
  } catch (err) {
    return createChatErrors.error.InternalServerError(res);
  }
};

const deleteChatErrors = new ControllerErrors(DeleteChatRequest.Errors);

export const DeleteChatController: TRouteController<
  DeleteChatRequest.Request,
  ChatResLocals
> = async (req, res) => {
  const { chatId } = req.body;
  const { chat, user } = res.locals;

  try {
    const isRemovedFromUser = await user.removeChat(chatId);

    if (!isRemovedFromUser) {
      return deleteChatErrors.error.ErrorDeletingChat(res);
    }

    Promise.all([chat.delete(), user.save()]);

    res.json({}).end();
  } catch (err) {
    return deleteChatErrors.error.ErrorDeletingChat(res);
  }
};
