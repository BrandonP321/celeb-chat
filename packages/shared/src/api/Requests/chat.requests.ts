import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { ChatUtils, TChat } from "../../utils/ChatUtils";
import { ChatModel } from "../models/Chat.model";
import { HttpStatusCode, ServerErrorStatusCodes } from "./HttpStatusCodes";

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
      msg: "Chat not found",
    },
    UnauthorizedChat: {
      status: HttpStatusCode.Unauthorized,
      errCode: ErrorCode.UnauthorizedChat,
      msg: "User is unauthorized to access this chat",
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
    UnableToFindRecipient: "UnableToFindRecipient",
    MaxChatLimitReached: "MaxChatLimitReached",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    InvalidFieldInput: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.InvalidFieldInput,
      msg: "Input format does not match requirements",
    },
    UnableToFindRecipient: {
      status: HttpStatusCode.NotFound,
      errCode: ErrorCode.UnableToFindRecipient,
      msg: "Unable to find recipient",
    },
    MaxChatLimitReached: {
      status: HttpStatusCode.Conflict,
      errCode: ErrorCode.MaxChatLimitReached,
      msg: `You have reached the max chat limit of ${ChatUtils.maxChatCount}`,
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
      msg: "An error occurred while deleting the chat.",
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
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
    ErrorUpdatingChat: {
      errCode: ErrorCode.ErrorUpdatingChat,
      msg: "An error occurred while deleting the chat.",
      status: ServerErrorStatusCodes.InternalServerError,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
