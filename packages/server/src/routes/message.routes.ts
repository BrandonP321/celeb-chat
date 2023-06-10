import express from "express";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import { AuthJwt } from "@/Middleware/AuthJWT";
import { GetUserMiddleware } from "@/Middleware/User.middleware";
import { GetChatWithMsgHistoryMiddleware } from "@/Middleware/Chat.middleware";
import { SendMsgController } from "@/Controllers/message.controllers";

const router = express.Router();

router.post(
  Routes.Msg.SendMsg(),
  AuthJwt,
  GetUserMiddleware,
  GetChatWithMsgHistoryMiddleware,
  SendMsgController
);

export default router;
