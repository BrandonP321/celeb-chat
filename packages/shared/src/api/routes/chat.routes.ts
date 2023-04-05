import { GetChatRequest } from "../Requests/chat.requests";

export const ChatRoutes = {
  CreateChat: () => `/api/chat/create`,
  GetChat: () => `/api/chat`,
  GetChatMessages: () => `/api/chat/messages`,
} as const;
