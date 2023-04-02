import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import { GetUserController } from "@/Controllers/user.controllers";
import { AuthJwt } from "@/Middleware/AuthJWT";
import { GetUserMiddleware } from "@/Middleware/GetUser.middleware";

const router = express.Router();

router.get(
  Routes.User.GetFullUser(),
  AuthJwt,
  GetUserMiddleware,
  GetUserController
);

export default router;
