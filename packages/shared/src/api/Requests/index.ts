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
    NetworkError: "NetworkError",
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
      msg: "Oops, we're having trouble finding your account info. Please log out and log back in. If the problem persists, reach out to our support team!",
    },
    InternalServerError: {
      status: HttpStatusCode.InternalServerError,
      errCode: ErrorCode.InternalServerError,
      msg: "Whoops, we're having some tech issues on our end. Try again in a bit. If the problem persists, let our support team know!",
    },
    NetworkError: {
      status: HttpStatusCode.InternalServerError,
      errCode: ErrorCode.NetworkError,
      msg: "Hmm, looks like we're having connection issues. Check your internet and try again!",
    },
  };

  export type Error = APIErrorResponse<typeof Errors>;
}
