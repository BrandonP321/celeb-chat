import { TAPIRequest } from "@goal-tracker/shared/src/api/Requests";
import { TRouteUrlParams } from "@goal-tracker/shared/src/api/routes";
import { Response, Request, NextFunction } from "express"

/** Utility type for annotating Express controller */
export type TRouteController<T extends TAPIRequest<TRouteUrlParams, {}, {}>, ResLocals extends {}> = (
	req: Request<T["Urlparams"], T["ResBody"], T["ReqBody"], {}, {}>, 
	res: Response<T["ResBody"], ResLocals>,
	next: NextFunction
) => Promise<any>;