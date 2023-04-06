import { HttpStatusCode } from "./HttpStatusCodes";

// TODO: look at optimizing this
/** Data required to construct API Request */
export type APIRequest<
  UrlParams extends {} = {},
  ReqBody = {},
  ResBody = {}
> = {
  Urlparams: UrlParams;
  ReqBody: ReqBody;
  ResBody: ResBody;
};

export type APIErrorResponse<Codes extends {}> = {
  errCode: keyof Codes;
  msg: string;
};

export type APIControllerResponse<Codes extends {}> = {
  status: number;
  msg: string;
  errCode: keyof Codes;
};

export type APIErrors<T extends {}> = {
  [key in keyof T]: APIControllerResponse<T>;
};

export namespace DefaultErrors {
  export const ErrorCode = {
    NotAuthenticated: "NotAuthenticated",
    UserNotFound: "UserNotFound",
    InternalServerError: "InternalServerError",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    NotAuthenticated: {
      status: HttpStatusCode.Unauthorized,
      errCode: ErrorCode.NotAuthenticated,
      msg: "User must authenticate",
    },
    UserNotFound: {
      status: HttpStatusCode.NotFound,
      errCode: ErrorCode.UserNotFound,
      msg: "User not found",
    },
    InternalServerError: {
      status: HttpStatusCode.InternalServerError,
      errCode: ErrorCode.InternalServerError,
      msg: "An unexpected error has occurred",
    },
  };
}
