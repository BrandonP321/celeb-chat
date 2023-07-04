import { Controller, EnvUtils } from "@/Utils";
import {
  CustomerCreatedRequest,
  StripeWebhookRequest,
  SubscriptionUpdatedRequest,
} from "@celeb-chat/shared/src/api/Requests/stripe.requests";
import db from "@/Models";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import retry from "async-retry";

export const StripeWebhookController = Controller<StripeWebhookRequest.Request>(
  async (...params) => {
    const [req] = params;
    const { type: eventType } = req.body;

    switch (eventType) {
      case "customer.created":
        return await CustomerCreatedController(...params);
      case "customer.subscription.updated":
        return await SubscriptionUpdatedController(...params);
    }
  }
);

export const SubscriptionUpdatedController =
  Controller<SubscriptionUpdatedRequest.Request>(async (req, res) => {
    const {
      data: { object },
    } = req.body;

    const { id: subscriptionId, plan, customer: custId } = object;

    const updateObj: UserModel.Subscription = {
      hasSubscribed: true,
      plan: {
        planId: plan.id,
        productId: plan.product,
        subscriptionId: subscriptionId,
      },
    };

    const updateUser = async () => {
      const update = await db.User.updateOne(
        { stripeCustomerId: custId },
        { $set: { subscription: updateObj } }
      );

      if (!update.matchedCount) {
        throw JSON.stringify(
          {
            msg: "Error updating subscription status.",
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
  });
