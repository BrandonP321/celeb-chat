import { DefaultErrors, APIRequest } from "@celeb-chat/shared/src/api/Requests";
import { Response } from "express";
import { TRouteController } from "@/Controllers";
import { ControllerErrors } from "@/Utils";
import { JWTResLocals, JWTUtils } from "@/Utils";
import db from "../models";

const haveUserReAuth = (res: Response, errMsg?: string) => {
  const { error } = new ControllerErrors(res, DefaultErrors.Errors);

  return error.NotAuthenticated(errMsg);
};

/** Middleware for protected API endpoints.  Authenticates user via JWTs sent in request header */
export const AuthJwt: TRouteController<
  APIRequest<{}, {}, {}>,
  JWTResLocals
> = async (req, res, next) => {
  try {
    const authTokens = JWTUtils.getTokensFromCookie(req);

    // if no tokens found, have user re-auth
    if (!authTokens) {
      return haveUserReAuth(res, "No auth tokens found");
    }

    // validate & decode tokens
    const aToken = JWTUtils.verifyAccessToken(authTokens.aToken);
    const rToken = JWTUtils.verifyRefreshToken(authTokens.rToken);

    // if token couldn't be verified or refresh token is expired, have user re-auth
    if (!aToken || !rToken || rToken.isExpired) {
      return haveUserReAuth(res, "Expired refresh token");
    }

    // if access token is expired, validate jwt id on tokens against jwt IDs stored on user's db document
    if (aToken.isExpired) {
      const areTokensRefreshed = await refreshTokens(
        aToken.jwtHash,
        rToken.jwtHash,
        rToken.userId,
        res
      );

      if (!areTokensRefreshed) {
        return haveUserReAuth(res, "Unable to refresh tokens");
      }
    } else {
      // if token doesn't need to be refreshed, ensure no cached token is being sent in response header
      res.setHeader("authorization", "");
    }

    // make user's id accessible to other controllers & middleware
    res.locals = { userId: aToken.userId };

    next();
  } catch (err) {
    return haveUserReAuth(res, "Unable to validate user authorization");
  }
};

/**
 * Refreshes access & refresh tokens
 * @returns true or false depending on whether tokens were successfully refreshed
 */
const refreshTokens = async (
  aTokenHash: string,
  rTokenHash: string,
  userId: string,
  res: Response
) => {
  try {
    const user = await db.User.findById(userId);

    // verify jwt id stored on tokens is a valid id stored on user's db document
    const isRefreshAllowed =
      user && aTokenHash === rTokenHash && user.jwtHash?.[rTokenHash];

    if (!isRefreshAllowed) {
      return false;
    }

    // generate and store tokens in reponse header
    const { tokenHashId, tokens: newTokens } =
      await JWTUtils.generateAndSetTokens(userId, res);

    if (!newTokens) {
      return false;
    }

    // remove old jwt id from user doc
    await user.removeJWTHash(rTokenHash);
    // add enw jwt id to user doc
    await user.addJWTHash(tokenHashId);
    await user.save();

    return true;
  } catch (err) {
    return false;
  }
};
