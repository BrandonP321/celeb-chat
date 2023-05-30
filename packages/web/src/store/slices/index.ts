import * as Responsive from "./Responsive/ResponsiveSlice";
import * as PageLoading from "./PageLoading/PageLoadingSlice";
import * as User from "./User/UserSlice";
import * as Chat from "./Chats/ChatsSlice";
import * as Alert from "./Alerts/AlertsSlice";
import * as ChatSidebar from "./ChatSidebar/ChatSidebar";

export { default as userReducer } from "./User/UserSlice";
export { default as pageLoadingReducer } from "./PageLoading/PageLoadingSlice";
export { default as responsiveReducer } from "./Responsive/ResponsiveSlice";
export { default as chatsReducer } from "./Chats/ChatsSlice";
export { default as alertsReducer } from "./Alerts/AlertsSlice";
export { default as chatSidebarReducer } from "./ChatSidebar/ChatSidebar";

export const Actions = {
  Responsive,
  PageLoading,
  User,
  Chat,
  Alert,
  ChatSidebar,
} as const;
