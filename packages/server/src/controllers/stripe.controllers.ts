import { Controller, ControllerErrors, EnvUtils, StripeUtils } from "@/Utils";
import {
  CreateCheckoutSessionRequest,
  CreatePortalSessionRequest,
  CustomerCreatedRequest,
  InvoicePaidRequest,
  StripeEventEnum,
  StripeSubStatus,
  StripeWebhookRequest,
  SubscriptionDeletedRequest,
  SubscriptionUpdatedRequest,
} from "@celeb-chat/shared/src/api/Requests/stripe.requests";
import db from "@/Models";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import retry from "async-retry";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { Stripe } from "stripe";
import _ from "lodash";
import { TUserDocLocals } from "../middleware";

export const StripeWebhookController = Controller<StripeWebhookRequest.Request>(
  async (...params) => {
    const [req, res] = params;
    const { type: eventType } = req.body;

    switch (eventType) {
      case StripeEventEnum.CustomerCreated:
        return await CustomerCreatedController(...params);
      // Also includes subscription getting cancelled (not when actually deleted)
      case StripeEventEnum.SubscriptionCreated:
      case StripeEventEnum.SubscriptionUpdated:
        return await SubscriptionUpdatedController(...params);
    }

    return res.json({}).end();
  }
);

export const SubscriptionUpdatedController =
  Controller<SubscriptionUpdatedRequest.Request>(async (req, res) => {
    const {
      data: { object },
    } = req.body;

    const { error } = new ControllerErrors(res, DefaultErrors.Errors);

    const {
      id: subscriptionId,
      plan,
      customer: custId,
      status,
      current_period_end,
      canceled_at,
      current_period_start: billingPeriodStart,
      // If ended, date subscripton was ended at
      ended_at,
    } = object;

    const billingPeriodEnd = current_period_end;
    // Add two day padding to billing period end for leeway
    const accessExpirationDate = billingPeriodEnd + 60 * 60 * 24 * 2;

    const product = plan.product as string;

    const user = await retry(
      () => db.User.findOne({ stripeCustomerId: custId }),
      {
        retries: EnvUtils.local ? 1 : 10,
        minTimeout: 1000,
        maxTimeout: 3000,
      }
    );

    if (!user) {
      return error.UserNotFound(
        `Unable to find user with stripe ID: ${custId}`
      );
    }

    const productUpdate: UserModel.SubscriptionPlan = {
      accessExpirationDate,
      accessStartDate: billingPeriodStart,
    };

    const tierName = StripeUtils.getSubTierName(product);

    user.subscription = {
      canceledAt: canceled_at,
      endedAt: ended_at,
      renewalDate: billingPeriodEnd,
      tierToRenew: tierName,
      isActive: ![StripeSubStatus.Canceled, StripeSubStatus.Unpaid].includes(
        status as StripeSubStatus
      ),
      plans: {
        ...user.subscription.plans,
        [tierName]: productUpdate,
      },
    };
    user.markModified("subscription");

    await retry(
      async () => {
        await user.save();
      },
      {
        retries: EnvUtils.local ? 1 : 10,
        minTimeout: 1000,
        maxTimeout: 3000,
      }
    );

    return res.json({}).end();
  });

export const CustomerCreatedController =
  Controller<CustomerCreatedRequest.Request>(async (req, res) => {
    const {
      data: { object },
    } = req.body;

    const { id: custId, email } = object;

    const updateUser = async () => {
      const update = await db.User.updateOne(
        { email },
        { $set: { stripeCustomerId: custId } }
      );

      if (!update.matchedCount) {
        throw JSON.stringify(
          {
            msg: "Error updating customer ID for new customer.",
            data: req.body,
          },
          null,
          4
        );
      }

      return;
    };

    await retry(updateUser, {
      retries: EnvUtils.local ? 1 : 10,
      minTimeout: 1000,
      maxTimeout: 3000,
    });

    return res.json({}).end();
  });

export const CreateCheckoutSessionController = Controller<
  CreateCheckoutSessionRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { returnUrl, tier = "free" } = req.body;
  const { user } = res.locals;

  if (user.stripeCustomerId) {
    return res.json({}).end();
  }

  const stripe = new Stripe(StripeUtils.apiKey, { apiVersion: "2022-11-15" });

  const portalSession = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    success_url: returnUrl,
    customer_email: user.email,
    allow_promotion_codes: true,
    automatic_tax: { enabled: true },
    cancel_url: returnUrl,
    phone_number_collection: {
      enabled: true,
    },
    mode: "subscription",
    line_items: [
      {
        price: StripeUtils.priceTierIDs[tier],
        quantity: 1,
      },
    ],
  });

  return res.json({ sessionUrl: portalSession.url ?? undefined });
});

export const CreatePortalSessionController = Controller<
  CreatePortalSessionRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { returnUrl } = req.body;
  const { user } = res.locals;

  if (!user.stripeCustomerId) {
    return res.json({}).end();
  }

  const stripe = new Stripe(StripeUtils.apiKey, { apiVersion: "2022-11-15" });

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: user.stripeCustomerId,
    return_url: returnUrl,
  });

  return res.json({ sessionUrl: portalSession.url });
});
