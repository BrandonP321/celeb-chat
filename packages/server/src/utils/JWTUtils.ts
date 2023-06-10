import bcrypt from "bcrypt";
import { CookieOptions, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Logger } from "./LoggerUtils";

export type JWTResLocals = {
  userId: string;
};

type TAuthTokens = {
  aToken: string;
  rToken: string;
};

const authTokenCookieName = "authTokens";

/**
 * JWT utility class with commented out methods that were used when JWTs were stored in http cookies.  Am leaving this code commented out to serve
 * as a representation of how JWTs should be implemented if the server and website were on the same domain and cross-site cookies could be used.
 */
export class JWTUtils {
  private static authCookieOptions = (maxAge?: number): CookieOptions => ({
    httpOnly: true,
    // TODO: false if local
    // secure: true,
    secure: false,
    maxAge,
    // TODO: false if local
    // sameSite: true,
    sameSite: false,
  });

  /** Returns random hash */
  public static generateHash = async () => {
    // generate hash without any periods to avoid problems accessing objects with hash as the key
    return (await bcrypt.hash(process.env.SECRET ?? "", 10)).replace(/\./g, "");
  };

  /** Stores access & refresh tokens in http secured cookies */
  public static generateTokenCookies = (tokens: TAuthTokens, res: Response) => {
    const maxAgeSeconds = parseInt(
      (process.env.REFRESH_TOKEN_EXPIRES_IN ?? "604800s").split("s")[0]
    );
    const maxAgeMs = maxAgeSeconds && maxAgeSeconds * 1000;

    res.cookie(
      authTokenCookieName,
      JSON.stringify(tokens),
      this.authCookieOptions(maxAgeMs)
    );
  };

  /** Gets JWT auth cookie, returning undefined if no cookie exists */
  public static getTokensFromCookie = (req: Request) => {
    const cookie: undefined | string = req.cookies?.[authTokenCookieName];
    const parsedCookie: undefined | TAuthTokens = cookie && JSON.parse(cookie);

    return parsedCookie;
  };

  public static getTokensFromHeader = (req: Request) => {
    try {
      const tokens = req.headers.authorization;
      const parsedTokens: TAuthTokens | undefined =
        tokens && JSON.parse(tokens);

      return parsedTokens;
    } catch (err) {
      return undefined;
    }
  };

  public static destroyTokenCookie = (res: Response) => {
    res.clearCookie(authTokenCookieName, this.authCookieOptions());
  };

  public static deleteClientAuthCookie = (res: Response) => {
    // res.cook(authTokenCookieName, "");
  };

  /** Returns new access & refresh tokens */
  public static generateTokens = (userId: string, tokenHashId: string) => {
    try {
      const aToken = this.getSignedAccessToken(userId, tokenHashId);
      const rToken = this.getSignedRefreshToken(userId, tokenHashId);

      return { aToken, rToken };
    } catch (err) {
      Logger.error(err);

      return undefined;
    }
  };

  /** Generates auth tokens and sets them in the response header */
  public static generateAndSetTokens = async (
    userId: string,
    res: Response,
    tokenHash?: string
  ) => {
    const newTokenHash = tokenHash ?? (await this.generateHash());
    const authTokens = this.generateTokens(userId, newTokenHash);

    if (authTokens) {
      this.generateTokenCookies(authTokens, res);
    }

    return { tokens: authTokens, tokenHashId: newTokenHash };
  };

  public static getSignedAccessToken = (
    userId: string,
    tokenIdHash: string
  ) => {
    return this.signToken(
      userId,
      process.env.ACCESS_TOKEN_SECRET ?? "",
      tokenIdHash,
      process.env.ACCESS_TOKEN_EXPIRES_IN ?? ""
    );
  };

  public static getSignedRefreshToken = (
    userId: string,
    tokenIdHash: string
  ) => {
    return this.signToken(
      userId,
      process.env.REFRESH_TOKEN_SECRET ?? "",
      tokenIdHash,
      process.env.REFRESH_TOKEN_EXPIRES_IN ?? ""
    );
  };

  public static signToken = (
    userId: string,
    secret: string,
    tokenIdHash: string,
    expiresIn?: string
  ) => {
    return jwt.sign({}, secret, {
      subject: userId,
      jwtid: tokenIdHash,
      expiresIn,
    });
  };

  public static verifyAccessToken = (token: string) => {
    return this.verifyToken(token, process.env.ACCESS_TOKEN_SECRET ?? "");
  };

  public static verifyRefreshToken = (token: string) => {
    return this.verifyToken(token, process.env.REFRESH_TOKEN_SECRET ?? "");
  };

  /**
   * Verifies & decodes JWT
   * @param token JWT
   * @param secret Secret hash used to verify token
   * @returns Decoded JWT with it's expiration status
   */
  public static verifyToken = (token: string, secret: string) => {
    const decodedToken = jwt.decode(token);

    let isExpired = false;

    try {
      // verify that token is still valid & not expired
      jwt.verify(token, secret);
    } catch (err) {
      // if error is thrown while verifying jwt, token is expired
      isExpired = true;
    }

    // if either the token couldn't be verified or sub/jti payload properties are undefined, return undefined
    if (
      typeof decodedToken === "string" ||
      !decodedToken ||
      !decodedToken.sub ||
      !decodedToken.jti
    ) {
      return undefined;
    }

    return {
      token: decodedToken,
      isExpired,
      userId: decodedToken.sub,
      jwtHash: decodedToken.jti,
    };
  };
}
