export const UserRoutes = {
  GetFullUser: () => `/api/user/me`,
  GetUserChats: () => `/api/user/chats`,
  GetUserAuth: () => `/api/user/auth`,
} as const;
