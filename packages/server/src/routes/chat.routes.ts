import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import { AuthJwt } from "@/Middleware/AuthJWT";
import {
  GetUserChatMiddleware,
  GetUserMiddleware,
} from "@/Middleware/User.middleware";
import {
  CreateChatController,
  DeleteChatController,
  GetChatController,
  GetChatMessagesController,
} from "@/Controllers/chat.controllers";
import {
  GetChatMiddleware,
  GetChatWithMsgPageMiddleware,
} from "@/Middleware/Chat.middleware";

const router = express.Router();

router.post(
  Routes.Chat.CreateChat(),
  AuthJwt,
  GetUserMiddleware,
  CreateChatController
);

router.post(
  Routes.Chat.GetChat(),
  AuthJwt,
  GetUserMiddleware,
  GetChatMiddleware,
  GetUserChatMiddleware,
  GetChatController
);

router.post(
  Routes.Chat.GetChatMessages(),
  AuthJwt,
  GetUserMiddleware,
  GetChatWithMsgPageMiddleware,
  GetChatMessagesController
);

router.post(
  Routes.Chat.DeleteChat(),
  AuthJwt,
  GetUserMiddleware,
  GetChatMiddleware,
  DeleteChatController
);

export default router;
