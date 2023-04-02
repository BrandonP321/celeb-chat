import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { DefaultErrors, APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { TRouteController } from "@/Controllers/index";
import { JWTResLocals, ControllerErrors } from "@/Utils";
import db from "@/Models";

export type TUserDocLocals = JWTResLocals & {
  user: UserModel.Document;
};

const GetUserErrors = new ControllerErrors(DefaultErrors.Errors);

/**
 * Finds user document and saves it as a local variable on the response.  MUST be preceded
 * by AuthJWT() middleware, which gets the user's id from auth tokens
 */
export const GetUserMiddleware: TRouteController<
  APIRequest<{}, {}, {}>,
  TUserDocLocals
> = async (req, res, next) => {
  try {
    const user = await db.User.findById(res.locals.userId);

    if (user) {
      res.locals.user = user;
      next();
    } else {
      return GetUserErrors.error.UserNotFound(res);
    }
  } catch (err) {
    return GetUserErrors.error.InternalServerError(res);
  }
};
