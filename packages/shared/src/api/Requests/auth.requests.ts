import { APIErrorResponse, APIErrors, DefaultErrors } from ".";
import { HttpStatusCode } from "./HttpStatusCodes";

export namespace RegisterAccountRequest {
  export type Response = {};

  export const ErrorCode = {
    ...DefaultErrors.ErrorCode,
    EmailTaken: "EmailTaken",
  } as const;

  export const Errors: APIErrors<typeof ErrorCode> = {
    ...DefaultErrors.Errors,
    EmailTaken: {
      status: HttpStatusCode.BadRequest,
      errCode: ErrorCode.EmailTaken,
      msg: "Email Taken",
    },
  } as const;

  export type Error = APIErrorResponse<typeof ErrorCode>;
}
