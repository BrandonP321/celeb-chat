declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      CORS_ORIGIN?: string;
      SECRET?: string;
      ACCESS_TOKEN_SECRET?: string;
      REFRESH_TOKEN_SECRET?: string;
      ACCESS_TOKEN_EXPIRES_IN?: string;
      REFRESH_TOKEN_EXPIRES_IN?: string;
      OPENAI_API_KEY?: string;
      PAGINATION_PAGE_SIZE?: string;
      CHAT_HISTORY_LENGTH?: string;
    }
  }
}

export {};
