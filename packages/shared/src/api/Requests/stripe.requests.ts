import Stripe from "stripe";
import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";

export type StripeEvent<T extends {}> = Omit<Stripe.Event, "data"> & {
  data: {
    object: T;
  };
};

export namespace StripeWebhookRequest {
  type ReqBody = StripeEvent<any>;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace SubscriptionUpdatedRequest {
  type ReqBody = StripeEvent<
    Stripe.Subscription & { plan: { id: string; product: string } }
  >;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace CustomerCreatedRequest {
  type ReqBody = StripeEvent<Stripe.Customer>;

  export type Request = APIRequest<{}, ReqBody, {}>;
}
