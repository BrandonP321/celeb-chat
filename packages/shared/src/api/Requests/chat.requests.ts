import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { TChat } from "../../utils/ChatUtils";
import { ChatModel } from "../models/Chat.model";
import { HttpStatusCode } from "./HttpStatusCodes";

export namespace ChatRequest {
  export type ReqBody = {
    chatId: string;
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
  type ReqBody = {
    description: string;
    displayName: string;
  };

  export type Response = ChatModel.FullChatJSON & TChat & {};

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    InvalidFieldInput: "InvalidFieldInput",
    UnableToFindRecipient: "UnableToFindRecipient",
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
  export type ReqBody = ChatRequest.ReqBody & {};
  export type Response = ChatModel.MessagesJSON;

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
