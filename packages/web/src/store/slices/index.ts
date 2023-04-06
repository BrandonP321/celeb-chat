import * as Responsive from "./Responsive/ResponsiveSlice";
import * as PageLoading from "./PageLoading/PageLoadingSlice";
import * as User from "./User/UserSlice";
import * as Chat from "./Chats/ChatsSlice";

export { default as userReducer } from "./User/UserSlice";
export { default as pageLoadingReducer } from "./PageLoading/PageLoadingSlice";
export { default as responsiveReducer } from "./Responsive/ResponsiveSlice";
export { default as chatsReducer } from "./Chats/ChatsSlice";

export const Actions = {
  Responsive,
  PageLoading,
  User,
  Chat,
} as const;
