import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import {
  GetUserAuthController,
  GetUserChatsController,
  GetUserController,
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

export default router;
