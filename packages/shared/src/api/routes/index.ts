import { AuthRoutes } from "./auth.routes";
import { ChatRoutes } from "./chat.routes";
import { MsgRoutes } from "./message.routes";
import { UserRoutes } from "./user.routes";

export const Routes = {
  Auth: AuthRoutes,
  User: UserRoutes,
  Chat: ChatRoutes,
  Msg: MsgRoutes,
};
