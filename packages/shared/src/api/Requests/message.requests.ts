import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { Message, TChat } from "../../utils/ChatUtils";
import { ChatModel } from "../models/Chat.model";
import { ChatRequest } from "./chat.requests";
import { ClientErrorStatusCodes, HttpStatusCode } from "./HttpStatusCodes";

export namespace MessageRequest {
  export type ReqBody = ChatRequest.ReqBody;

  export const ErrorCode = {
    ...ChatRequest.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...ChatRequest.Errors,
  };
}

export namespace SendMsgRequest {
  type ReqBody = MessageRequest.ReqBody & {
    msgBody: string;
  };

  export type Response = {
    newMsg: Message;
  };

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    ErrorFetchingChatCompletion: "ErrorFetchingChatCompletion",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    ErrorFetchingChatCompletion: {
      status: ClientErrorStatusCodes.BadRequest,
      errCode: ErrorCode.ErrorFetchingChatCompletion,
      msg: "An error occurred while retrieving a response",
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
