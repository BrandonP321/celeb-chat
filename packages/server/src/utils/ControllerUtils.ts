import {
  APIControllerResponse,
  APIErrorResponse,
} from "@celeb-chat/shared/src/api/Requests";
import { Response } from "express";

type ControllerResponses<T extends {}> = {
  [key in keyof T]: APIControllerResponse<T>;
};

export class ControllerErrors<Errors extends ControllerResponses<{}>> {
  public error: {
    [key in keyof Errors]: (res: Response, msg?: string) => Response;
  } = {} as typeof this.error;

  constructor(errors: Errors) {
    for (const errorKey in errors) {
      const error = errors[errorKey] as APIControllerResponse<{}>;

      this.error[errorKey] = (res, msg) => {
        const resJSON: APIErrorResponse<Errors> = {
          errCode: error.errCode,
          msg: msg ?? error.msg,
        };

        return res.status(error.status).json(resJSON).end();
      };
    }
  }
}
