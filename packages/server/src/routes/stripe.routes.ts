import {
  CreateCheckoutSessionController,
  CreatePortalSessionController,
  StripeWebhookController,
} from "@/Controllers/stripe.controllers";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import express from "express";
import { AuthJwt, GetUserMiddleware } from "../middleware";

const router = express.Router();

router.post(Routes.Stripe.StripeWebhook(), StripeWebhookController);

router.post(
  Routes.Stripe.CreateCheckoutSession(),
  AuthJwt,
  GetUserMiddleware,
  CreateCheckoutSessionController
);

router.post(
  Routes.Stripe.CreatePortalSession(),
  AuthJwt,
  GetUserMiddleware,
  CreatePortalSessionController
);

export default router;
