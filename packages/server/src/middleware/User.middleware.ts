import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { DefaultErrors, APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { TRouteController } from "@/Controllers/index";
import { JWTResLocals, ControllerErrors } from "@/Utils";
import db from "@/Models";
import { ChatResLocals } from "./Chat.middleware";
import { TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { ChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";

export type TUserDocLocals = JWTResLocals & {
  user: UserModel.Document;
};

const GetUserErrors = new ControllerErrors(DefaultErrors.Errors);

/**
 * Finds user document and saves it as a local variable on the response.  MUST be preceded
 * by AuthJWT() middleware, which gets the user's id from auth tokens
 */
export const GetUserMiddleware: TRouteController<
  APIRequest<{}, {}, {}>,
  TUserDocLocals
> = async (req, res, next) => {
  try {
    const user = await db.User.findById(res.locals.userId);

    if (user) {
      res.locals.user = user;
      next();
    } else {
      return GetUserErrors.error.UserNotFound(res);
    }
  } catch (err) {
    return GetUserErrors.error.InternalServerError(res);
  }
};

export type UserChatLocals = ChatResLocals & {
  userChat: UserModel.UserChat;
};

const getUserChatErrors = new ControllerErrors(ChatRequest.Errors);

export const GetUserChatMiddleware: TRouteController<
  APIRequest<{}, ChatRequest.ReqBody, {}>,
  UserChatLocals
> = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { chatId } = req.body;

    const chat = user.chats.find((c) => c.id === chatId);

    if (!chat) {
      return getUserChatErrors.error.InternalServerError(res);
    }

    res.locals.userChat = chat;
    next();
  } catch (err) {
    return getUserChatErrors.error.InternalServerError(res);
  }
};
