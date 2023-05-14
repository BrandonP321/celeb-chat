import {
  GetUserAuthRequest,
  GetUserChatsRequest,
  GetUserRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import { TRouteController } from ".";
import { TUserDocLocals } from "@/Middleware";
import { Controller } from "@/Utils";

/** Returns full user JSON without sensitive data */
export const GetUserController = Controller<
  GetUserRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  return res.json(await res.locals.user.toFullJSON()).end();
});

/** Returns basic user info  */
export const GetUserAuthController = Controller<
  GetUserAuthRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  return res.json(await res.locals.user.toShallowJSON()).end();
});

export const GetUserChatsController = Controller<
  GetUserChatsRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { user } = res.locals;

  res.json({ chats: user.chats }).end();
});
