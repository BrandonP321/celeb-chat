export const UserRoutes = {
  GetFullUser: () => `/api/user/me`,
  GetUserChats: () => `/api/user/chats`,
  GetUserAuth: () => `/api/user/auth`,
  UpdateUser: () => `/api/user/update`,
  CreatePasswordResetRequest: () => `/api/user/password/reset/request`,
  ResetPassword: () => `/api/user/password/reset`,
} as const;
