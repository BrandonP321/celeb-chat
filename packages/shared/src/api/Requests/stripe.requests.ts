import Stripe from "stripe";
import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";

export enum StripeSubStatus {
  Active = "active",
  Unpaid = "unpaid",
  Canceled = "canceled",
}

export enum StripeEventEnum {
  CustomerCreated = "customer.created",
  SubscriptionUpdated = "customer.subscription.updated",
  SubscriptionCreated = "customer.subscription.created",
  /** Occurs when a user's subscription ends */
  SubscriptionDeleted = "customer.subscription.deleted",
  /** Only applies when subscription status is `paused` */
  SubscriptionPaused = "customer.subscription.paused",
  /** Only applies when subscription status is `paused` */
  SubscriptionResumed = "customer.subscription.resumed",
  /** Occurs when pending updates are applied and the subscription is updated */
  SubscriptionPendingUpdateApplied = "customer.subscription.pending_update_applied",
  /** Occurs when invoice is successfully paid.  Can provision access to product if status is active */
  InvoicePaid = "invoice.paid",
}

export type StripeEvent<T extends {}> = Omit<Stripe.Event, "data" | "type"> & {
  data: {
    object: T;
  };
  type: StripeEventEnum;
};

export namespace StripeWebhookRequest {
  type ReqBody = StripeEvent<any>;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace SubscriptionUpdatedRequest {
  type ReqBody = StripeEvent<
    Stripe.Subscription & { plan: Stripe.SubscriptionItem["plan"] }
  >;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace SubscriptionDeletedRequest {
  type ReqBody = StripeEvent<
    Stripe.Subscription & { plan: Stripe.SubscriptionItem["plan"] }
  >;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace InvoicePaidRequest {
  type ReqBody = StripeEvent<
    Stripe.Invoice & { plan: Stripe.SubscriptionItem["plan"] }
  >;

  export type Request = APIRequest<{}, ReqBody, {}>;
}

export namespace CustomerCreatedRequest {
  type ReqBody = StripeEvent<Stripe.Customer>;

  export type Request = APIRequest<{}, ReqBody, {}>;
}
