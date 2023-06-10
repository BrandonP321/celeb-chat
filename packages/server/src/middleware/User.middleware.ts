import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { DefaultErrors, APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { TRouteController } from "@/Controllers/index";
import { JWTResLocals, ControllerErrors, Controller } from "@/Utils";
import db from "@/Models";
import { ChatResLocals } from "./Chat.middleware";
import { ChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";

export type TUserDocLocals = JWTResLocals & {
  user: UserModel.Document;
};

/**
 * Finds user document and saves it as a local variable on the response.  MUST be preceded
 * by AuthJWT() middleware, which gets the user's id from auth tokens
 */
export const GetUserMiddleware = Controller<
  APIRequest<{}, {}, {}>,
  TUserDocLocals
>(async (req, res, next) => {
  const { error } = new ControllerErrors(res, DefaultErrors.Errors);
  const user = await db.User.findById(res.locals.userId);

  if (user) {
    res.locals.user = user;
    next();
  } else {
    return error.UserNotFound();
  }
});

export type UserChatLocals = ChatResLocals & {
  userChat: UserModel.UserChat;
};

export const GetUserChatMiddleware = Controller<
  APIRequest<{}, ChatRequest.ReqBody, {}>,
  UserChatLocals
>(async (req, res, next) => {
  const { error } = new ControllerErrors(res, DefaultErrors.Errors);

  const { user } = res.locals;
  const { chatId } = req.body;

  const chat = user.chats.find((c) => c.id === chatId);

  if (!chat) {
    return error.InternalServerError(
      undefined,
      "Chat could not be found on user's chat list"
    );
  }

  res.locals.userChat = chat;
  next();
});
