import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { Loc } from "../../../loc";
import { ChatUtils, TChat } from "../../utils/ChatUtils";
import { ChatModel } from "../models/Chat.model";
import {
  ClientErrorStatusCodes,
  HttpStatusCode,
  ServerErrorStatusCodes,
} from "./HttpStatusCodes";

export namespace ChatRequest {
  export type ReqBody = {
    chatId: string;
  };

  export type WithMsgsReqBody = ReqBody & {
    marker?: number | null;
  };

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    ChatNotFound: "ChatNotFound",
    UnauthorizedChat: "UnauthorizedChat",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    ChatNotFound: {
      status: HttpStatusCode.NotFound,
      errCode: ErrorCode.ChatNotFound,
      msg: Loc.Server.Chat.ChatNotFound,
    },
    UnauthorizedChat: {
      status: HttpStatusCode.Unauthorized,
      errCode: ErrorCode.UnauthorizedChat,
      msg: Loc.Server.Chat.UnauthorizedChat,
    },
  };
}

export namespace CreateChatRequest {
  export type ReqBody = {
    description: string;
    displayName: string;
  };

  export type Response = ChatModel.FullChatJSON & TChat & {};

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    InvalidFieldInput: "InvalidFieldInput",
    MaxChatLimitReached: "MaxChatLimitReached",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    InvalidFieldInput: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.InvalidFieldInput,
      msg: Loc.Server.Chat.CreateChat.InvalidField,
    },
    MaxChatLimitReached: {
      status: HttpStatusCode.Conflict,
      errCode: ErrorCode.MaxChatLimitReached,
      msg: Loc.Server.Chat.CreateChat.MaxChatLimitReached,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace GetChatRequest {
  export type Response = ChatModel.FullChatJSONWithoutMessages;

  export type Request = APIRequest<{}, {}, Response>;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace GetChatMessagesRequest {
  export type ReqBody = ChatRequest.WithMsgsReqBody & {};

  export type Response = ChatModel.MessagesJSON & {
    nextPageMarker: number | null;
    displayName: string;
  };

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace DeleteChatRequest {
  export type ReqBody = ChatRequest.ReqBody & {};

  export type Response = {};

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
    ErrorDeletingChat: "ErrorDeletingChat",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
    ErrorDeletingChat: {
      errCode: ErrorCode.ErrorDeletingChat,
      msg: Loc.Server.Chat.DeleteChat.InternalErr,
      status: ServerErrorStatusCodes.InternalServerError,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace UpdateChatRequest {
  export type UpdateFields = ChatModel.ChatUpdates;

  export type ReqBody = ChatRequest.ReqBody & Partial<UpdateFields> & {};

  export type Response = {};

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
    ErrorUpdatingChat: "ErrorUpdatingChat",
    InvalidInput: "InvalidInput",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
    ErrorUpdatingChat: {
      errCode: ErrorCode.ErrorUpdatingChat,
      msg: Loc.Server.Chat.UpdateChat.InternalErr,
      status: ServerErrorStatusCodes.InternalServerError,
    },
    InvalidInput: {
      errCode: ErrorCode.InvalidInput,
      msg: "",
      status: ClientErrorStatusCodes.BadRequest,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
