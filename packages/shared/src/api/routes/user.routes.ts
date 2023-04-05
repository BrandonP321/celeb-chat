export const UserRoutes = {
  GetFullUser: () => `/api/user/me`,
  GetUserChats: () => `/api/user/chats`,
} as const;
