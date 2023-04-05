import {
  GetUserChatsRequest,
  GetUserRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import { TRouteController } from ".";
import { TUserDocLocals } from "@/Middleware";

/** Returns full user JSON without sensitive data */
export const GetUserController: TRouteController<
  GetUserRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  return res.json(await res.locals.user.toFullJSON()).end();
};

export const GetUserChatsController: TRouteController<
  GetUserChatsRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  const { user } = res.locals;

  res.json({ chats: user.chats }).end();
};
