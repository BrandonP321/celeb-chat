import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { Loc } from "../../../loc";
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
  export type ReqBody = MessageRequest.ReqBody &
    ChatRequest.WithMsgsReqBody & {
      msgBody: string;
    };

  export type Response = {
    newMsg: ChatModel.IndexlessMessage;
  };

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    ErrorFetchingChatCompletion: "ErrorFetchingChatCompletion",
    InvalidMsgInput: "InvalidMsgInput",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    ErrorFetchingChatCompletion: {
      status: ClientErrorStatusCodes.BadRequest,
      errCode: ErrorCode.ErrorFetchingChatCompletion,
      msg: Loc.Server.Msg.ChatCompleteErr,
    },
    InvalidMsgInput: {
      status: ClientErrorStatusCodes.BadRequest,
      errCode: ErrorCode.InvalidMsgInput,
      msg: Loc.Server.Msg.InvalidInput,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
