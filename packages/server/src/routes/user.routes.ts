import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import {
  CreatePasswordResetRequestController,
  GetUserAuthController,
  GetUserChatsController,
  GetUserController,
  ResetPasswordController,
} from "@/Controllers/user.controllers";
import { AuthJwt } from "@/Middleware/AuthJWT";
import { GetUserMiddleware } from "@/Middleware/User.middleware";

const router = express.Router();

router.get(
  Routes.User.GetFullUser(),
  AuthJwt,
  GetUserMiddleware,
  GetUserController
);

router.get(
  Routes.User.GetUserChats(),
  AuthJwt,
  GetUserMiddleware,
  GetUserChatsController
);

router.get(
  Routes.User.GetUserAuth(),
  AuthJwt,
  GetUserMiddleware,
  GetUserAuthController
);

router.post(
  Routes.User.CreatePasswordResetRequest(),
  CreatePasswordResetRequestController
);

router.post(Routes.User.ResetPassword(), ResetPasswordController);

export default router;
