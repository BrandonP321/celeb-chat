import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { UserModel } from "../models/User.model";
import { HttpStatusCode } from "./HttpStatusCodes";

export namespace GetUserRequest {
  type ReqBody = {};

  export type Response = UserModel.FullJSON;

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace GetUserAuthRequest {
  type ReqBody = {};

  export type Response = UserModel.ShallowJSON;

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace GetUserChatsRequest {
  type ReqBody = {};

  export type Response = { chats: UserModel.UserChat[] };

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
