import { StripeWebhookController } from "@/Controllers/stripe.controllers";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import express from "express";

const router = express.Router();

router.post(Routes.Stripe.StripeWebhook(), StripeWebhookController);

export default router;
