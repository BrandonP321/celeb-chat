export const ChatRoutes = {
  CreateChat: () => `/api/chat/create`,
  GetChat: () => `/api/chat`,
  GetChatMessages: () => `/api/chat/messages`,
  DeleteChat: () => `/api/chat/delete`,
  UpdateChat: () => `/api/chat/update`,
} as const;
