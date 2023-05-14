import {
  APIControllerResponse,
  APIErrorResponse,
  APIRequest,
  DefaultErrors,
} from "@celeb-chat/shared/src/api/Requests";
import { Response } from "express";
import { TRouteController } from "../controllers";

type ControllerResponses<T extends {}> = {
  [key in keyof T]: APIControllerResponse<T>;
};

export class ControllerErrors<Errors extends ControllerResponses<{}>> {
  public error: {
    [key in keyof Errors]: (msg?: string) => Response;
  } = {} as typeof this.error;

  constructor(res: Response, errors: Errors) {
    for (const errorKey in errors) {
      const error = errors[errorKey] as APIControllerResponse<{}>;

      this.error[errorKey] = (msg) => {
        const resJSON: APIErrorResponse<Errors> = {
          errCode: error.errCode,
          msg: msg ?? error.msg,
        };

        return res.status(error.status).json(resJSON).end();
      };
    }
  }
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
      return error.InternalServerError();
    }
  };
};
