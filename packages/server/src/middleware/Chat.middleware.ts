import { APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { TRouteController } from "@/Controllers/index";
import { ControllerErrors } from "@/Utils";
import db from "@/Models";
import { ChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { TUserDocLocals } from "./User.middleware";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";

export type ChatResLocals = TUserDocLocals & {
  chat: ChatModel.Document;
};

const GetChatErrors = new ControllerErrors(ChatRequest.Errors);

/**
 * Finds user document and saves it as a local variable on the response.  MUST be preceded
 * by `AuthJWT()` & `GetUserMiddleware()` middleware, which gets the user's id from auth tokens
 */
export const GetChatMiddleware: TRouteController<
  APIRequest<{}, ChatRequest.ReqBody, {}>,
  ChatResLocals
> = async (req, res, next) => {
  try {
    const chat = await db.Chat.findById(req.body.chatId);

    if (!chat) {
      return GetChatErrors.error.ChatNotFound(res);
    } else if (chat.id !== req.body.chatId) {
      return GetChatErrors.error.UnauthorizedChat(res);
    }

    res.locals.chat = chat;
    next();
  } catch (err) {
    return GetChatErrors.error.InternalServerError(res);
  }
};
