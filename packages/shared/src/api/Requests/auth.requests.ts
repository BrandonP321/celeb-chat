import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { UserModel } from "../models/User.model";
import { HttpStatusCode } from "./HttpStatusCodes";

export namespace RegisterAccountRequest {
  export type ReqBody = {
    email: string;
    username: string;
    password: string;
  };

  export type Response = UserModel.ShallowJSON;

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    EmailTaken: "EmailTaken",
    UsernameTaken: "UsernameTaken",
    InvalidFieldInput: "InvalidFieldInput",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    EmailTaken: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.EmailTaken,
      msg: "Email Taken",
    },
    UsernameTaken: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.UsernameTaken,
      msg: "Username taken",
    },
    InvalidFieldInput: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.InvalidFieldInput,
      msg: "Registration fields don't meet the required format",
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace LoginRequest {
  export type ReqBody = {
    email: string;
    password: string;
  };

  export type Response = UserModel.ShallowJSON;

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    InvalidEmailOrPassword: "InvalidEmailOrPassword",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    InvalidEmailOrPassword: {
      status: HttpStatusCode.Unauthorized,
      errCode: ErrorCode.InvalidEmailOrPassword,
      msg: "Email or password is incorrect",
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace SignoutRequest {
  type ReqBody = {};
  export type Response = {};
  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace AuthStatusRequest {
  type ReqBody = {};
  export type Response = {};
  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
