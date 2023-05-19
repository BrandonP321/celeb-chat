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

export namespace ResetPasswordRequest {
  export type ReqBody = {
    password: string;
    passwordConfirmation: string;
    confirmationId: string;
    confirmationHash: string;
  };

  export type Response = {};

  export type Request = APIRequest<{}, ReqBody, Response>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    MissingConfirmationData: "MissingConfirmationData",
    InvalidInput: "InvalidInput",
    RequestNotFound: "RequestNotFound",
    IncorrectHash: "IncorrectHash",
    RequestExpired: "RequestExpired",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    MissingConfirmationData: {
      errCode: ErrorCode.MissingConfirmationData,
      msg: "Missing required data to reset password",
      status: HttpStatusCode.BadRequest,
    },
    InvalidInput: {
      errCode: ErrorCode.InvalidInput,
      msg: "Input does not match required format",
      status: HttpStatusCode.BadRequest,
    },
    RequestNotFound: {
      errCode: ErrorCode.RequestNotFound,
      msg: "Request to reset password does not exist",
      status: HttpStatusCode.NotFound,
    },
    IncorrectHash: {
      errCode: ErrorCode.IncorrectHash,
      msg: "Incorrect has was supplied",
      status: HttpStatusCode.BadRequest,
    },
    RequestExpired: {
      errCode: ErrorCode.RequestExpired,
      msg: "Request to reset password has expired",
      status: HttpStatusCode.Forbidden,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace CreatePasswordResetRequest {
  export type ReqBody = {
    email: string;
  };

  export type Response = {};

  export type Request = APIRequest<{}, ReqBody, {}>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    EmailRequired: "EmailRequired",
    UnableToSendEmail: "UnableToSendEmail",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    EmailRequired: {
      errCode: ErrorCode.EmailRequired,
      msg: "Email Required",
      status: HttpStatusCode.BadRequest,
    },
    UnableToSendEmail: {
      errCode: ErrorCode.UnableToSendEmail,
      msg: "Unable to send email",
      status: HttpStatusCode.InternalServerError,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
