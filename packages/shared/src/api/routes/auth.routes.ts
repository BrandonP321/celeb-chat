export const AuthRoutes = {
  Register: () => `/api/auth/register`,
  Login: () => `/api/auth/login`,
  Signout: () => `/api/auth/signout`,
  CheckIsUserAuthed: () => `/api/auth/status`,
} as const;
