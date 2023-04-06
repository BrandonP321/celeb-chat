import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import {
  AuthStatusController,
  LoginUserController,
  RegisterUserController,
  SignoutUserController,
} from "@/Controllers/auth.controllers";
import { AuthJwt } from "@/Middleware/AuthJWT";
import { GetUserMiddleware } from "@/Middleware/User.middleware";

const router = express.Router();

router.post(Routes.Auth.Register(), RegisterUserController);
router.post(Routes.Auth.Login(), LoginUserController);
router.post(
  Routes.Auth.Signout(),
  AuthJwt,
  GetUserMiddleware,
  SignoutUserController
);
router.get(Routes.Auth.CheckIsUserAuthed(), AuthJwt, AuthStatusController);

export default router;
