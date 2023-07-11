export const StripeRoutes = {
  StripeWebhook: () => `/webhook/stripe`,
  CreateCheckoutSession: () => `/api/stripe/create-checkout-session`,
  CreatePortalSession: () => `/api/stripe/create-portal-session`,
} as const;
