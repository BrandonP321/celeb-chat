import { TRouteController } from ".";
import {
  CreateChatRequest,
  GetChatMessagesRequest,
  GetChatRequest,
} from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { TUserDocLocals, UserChatLocals } from "@/Middleware";
import { JWTResLocals } from "utils/JWTUtils";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import db from "../models";
import { ControllerErrors } from "utils/ControllerUtils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { ChatResLocals } from "@/Middleware/Chat.middleware";

const getChatErrors = new ControllerErrors(GetChatRequest.Errors);

/** Returns a chat without its first page of messages */
export const GetChatController: TRouteController<
  GetChatRequest.Request,
  UserChatLocals
> = async (req, res) => {
  try {
    const { chat, userChat } = res.locals;

    res.json({ ...userChat, ...chat.toFullJSON() }).end();
  } catch (err) {
    return getChatErrors.error.InternalServerError(res);
  }
};

const getMessagesErrors = new ControllerErrors(GetChatMessagesRequest.Errors);

export const GetChatMessagesController: TRouteController<
  GetChatMessagesRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  const { chatId } = req.body;
  const { user } = res.locals;

  try {
    const chat = await db.Chat.findById(chatId);

    if (!chat) {
      return getMessagesErrors.error.ChatNotFound(res);
    }

    // TODO: implement pagination

    res.json({ messages: chat.messages }).end();
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
