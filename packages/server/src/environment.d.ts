declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV?: "local" | "dev" | "prod";
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
      AWS_IAM_CW_FULL_ACCESS_KEY_ID?: string;
      AWS_IAM_CW_FULL_ACCESS_KEY_SECRET?: string;
      AWS_IAM_SES_FULL_ACCESS_KEY_ID?: string;
      AWS_IAM_SES_FULL_ACCESS_KEY_SECRET?: string;
      AWS_IAM_SES_FULL_ACCESS_REGION?: string;
      STRIPE_API_KEY_TEST?: string;
      STRIPE_API_KEY_LIVE?: string;
      STRIPE_VERSION?: string;
      STRIPE_TEST_PRODUCT_TIER_FREE?: string;
      STRIPE_TEST_PRODUCT_TIER_TWO?: string;
      STRIPE_TEST_PRODUCT_TIER_THREE?: string;
      STRIPE_LIVE_PRODUCT_TIER_FREE?: string;
      STRIPE_LIVE_PRODUCT_TIER_TWO?: string;
      STRIPE_LIVE_PRODUCT_TIER_THREE?: string;
    }
  }
}

export {};
