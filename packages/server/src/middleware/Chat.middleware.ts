import { APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { TRouteController } from "@/Controllers/index";
import { Controller, ControllerErrors } from "@/Utils";
import db from "@/Models";
import { ChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { TUserDocLocals } from "./User.middleware";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { NextFunction, Response } from "express";

export type ChatResLocals = TUserDocLocals & {
  chat: Omit<ChatModel.Document, "messages">;
};

export const GetChatMiddleware = Controller<
  APIRequest<{}, ChatRequest.ReqBody, {}>,
  ChatResLocals
>(async (req, res, next) => {
  getChat(req.body.chatId, res, next);
});

export type ChatWithMsgsResLocals = TUserDocLocals & {
  chat: ChatModel.Document;
  pageSize: number;
};

export const GetChatWithMsgPageMiddleware = Controller<
  APIRequest<{}, ChatRequest.WithMsgsReqBody, {}>,
  ChatWithMsgsResLocals
>(async (req, res, next) => {
  const { chatId, marker } = req.body;
  const { error } = new ControllerErrors(res, ChatRequest.Errors);

  const pageSize = parseInt(process.env.PAGINATION_PAGE_SIZE ?? "20");

  let newMarker: number;
  let newPageSize: number;

  if (typeof marker !== "number") {
    newMarker = pageSize * -1;
    newPageSize = pageSize;
  } else {
    newMarker = marker - pageSize < 0 ? 0 : marker - pageSize;
    newPageSize = marker + 1 - newMarker;
  }

  res.locals.pageSize = pageSize;
  getChat(chatId, res, next, { marker: newMarker, pageSize: newPageSize });
});

export const GetChatWithMsgHistoryMiddleware = Controller<
  APIRequest<{}, ChatRequest.ReqBody, {}>,
  ChatWithMsgsResLocals
>(async (req, res, next) => {
  const { chatId } = req.body;
  const { error } = new ControllerErrors(res, ChatRequest.Errors);

  const msgHistoryLength = parseInt(process.env.CHAT_HISTORY_LENGTH ?? "20");

  res.locals.pageSize = msgHistoryLength;
  getChat(chatId, res, next, {
    marker: msgHistoryLength,
    pageSize: msgHistoryLength,
  });
});

const getChat = async (
  chatId: string,
  res: Response<{}, ChatResLocals>,
  next: NextFunction,
  sliceOptions?: { pageSize: number; marker: number }
) => {
  const { error: resError } = new ControllerErrors(res, ChatRequest.Errors);

  try {
    const chat = sliceOptions
      ? await db.Chat.findById(chatId).slice("messages", [
          sliceOptions.marker,
          sliceOptions.pageSize,
        ])
      : await db.Chat.findById(chatId).select("-messages");

    if (!chat) {
      return resError.ChatNotFound();
    } else if (chat.ownerId !== res.locals.userId) {
      return resError.UnauthorizedChat();
    }

    res.locals.chat = chat;
    next();
  } catch (err) {
    const error: any = err;

    const isChatNotFound = error?.kind === "ObjectId";

    if (isChatNotFound) {
      return resError.ChatNotFound();
    }

    return resError.InternalServerError(undefined, err);
  }
};
