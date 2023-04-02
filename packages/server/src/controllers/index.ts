import { APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { Response, Request, NextFunction } from "express";

/** Utility type for annotating Express controller */
export type TRouteController<
  T extends APIRequest<{}, {}, {}>,
  ResLocals extends {}
> = (
  req: Request<T["Urlparams"], T["ResBody"], T["ReqBody"], {}, {}>,
  res: Response<T["ResBody"], ResLocals>,
  next: NextFunction
) => Promise<any>;
