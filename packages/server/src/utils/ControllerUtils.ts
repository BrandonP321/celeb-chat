import {
  APIControllerResponse,
  APIErrorResponse,
  APIRequest,
  DefaultErrors,
} from "@celeb-chat/shared/src/api/Requests";
import { Response } from "express";
import { TRouteController } from "../controllers";
import { Logger } from "./LoggerUtils";

type ControllerResponses<T extends {}> = {
  [key in keyof T]: APIControllerResponse<T>;
};

export class ControllerErrors<Errors extends ControllerResponses<{}>> {
  public error: {
    [key in keyof Errors]: (msg?: string, err?: any) => Response;
  } = {} as typeof this.error;

  constructor(res: Response, errors: Errors) {
    for (const errorKey in errors) {
      const error = errors[errorKey] as APIControllerResponse<{}>;

      this.error[errorKey] = (msg, err) => {
        const resJSON: APIErrorResponse<Errors> = {
          errCode: error.errCode,
          msg: msg ?? error.msg,
        };

        this.logError(err);

        return res.status(error.status).json(resJSON).end();
      };
    }
  }

  private logError = (err: any) => {
    if (err) {
      if (typeof err !== "string") {
        err = JSON.stringify(err);
      }

      Logger.error(err);
    }
  };
}

/**
 * Creates a controller cb that is wrapped in a try catch block to catch any unexpected errors
 * @param cb Callback that is wrapped in a try catch block
 */
export const Controller = <
  T extends APIRequest<{}, {}, {}>,
  ResLocals extends {} = {}
>(
  cb: TRouteController<T, ResLocals>
): TRouteController<T, ResLocals> => {
  return async (req, res, next) => {
    const { error } = new ControllerErrors(res, DefaultErrors.Errors);

    try {
      cb(req, res, next);
    } catch (err) {
      return error.InternalServerError(undefined, err);
    }
  };
};
