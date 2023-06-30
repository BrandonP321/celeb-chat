import { APIErrorResponse, APIErrors, APIRequest, DefaultErrors } from ".";
import { Loc } from "../../../loc";
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

export namespace UpdateUserRequest {
  export type ReqBody = {
    email?: string;
    username?: string;
  };

  export type Request = APIRequest<{}, ReqBody, {}>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    InvalidInput: "InvalidInput",
    EmailTaken: "EmailTaken",
    UsernameTaken: "UsernameTaken",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    InvalidInput: {
      errCode: ErrorCode.InvalidInput,
      msg: "Input does not match required format",
      status: HttpStatusCode.BadRequest,
    },
    EmailTaken: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.EmailTaken,
      msg: Loc.Server.Auth.EmailTaken,
    },
    UsernameTaken: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.UsernameTaken,
      msg: Loc.Server.Auth.UsernameTaken,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace SendEmailVerificationRequest {
  export type ReqBody = {};

  export type Request = APIRequest<{}, ReqBody, {}>;

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    UnableToSendEmail: "UnableToSendEmail",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    UnableToSendEmail: {
      errCode: ErrorCode.UnableToSendEmail,
      msg: Loc.Web.UserDash.VerificationEmailNotSent,
      status: HttpStatusCode.InternalServerError,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}

export namespace VerifyEmailRequest {
  export type ReqBody = {
    userId: string;
    hash: string;
  };

  export type Request = APIRequest<{}, ReqBody, {}>;

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
      msg: Loc.Web.PassReset.APIErrors.BadURL,
      status: HttpStatusCode.BadRequest,
    },
    InvalidInput: {
      errCode: ErrorCode.InvalidInput,
      msg: "Input does not match required format",
      status: HttpStatusCode.BadRequest,
    },
    RequestNotFound: {
      errCode: ErrorCode.RequestNotFound,
      msg: Loc.Web.PassReset.APIErrors.BadURL,
      status: HttpStatusCode.NotFound,
    },
    IncorrectHash: {
      errCode: ErrorCode.IncorrectHash,
      msg: Loc.Web.PassReset.APIErrors.BadURL,
      status: HttpStatusCode.BadRequest,
    },
    RequestExpired: {
      errCode: ErrorCode.RequestExpired,
      msg: Loc.Web.PassReset.APIErrors.ExpiredRequest,
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
      msg: Loc.Web.RequestPassReset.APIErrors.EmailRequired,
      status: HttpStatusCode.BadRequest,
    },
    UnableToSendEmail: {
      errCode: ErrorCode.UnableToSendEmail,
      msg: Loc.Web.RequestPassReset.APIErrors.UnableToSendEmail,
      status: HttpStatusCode.InternalServerError,
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
