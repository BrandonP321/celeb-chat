import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import {
  AuthStatusRequest,
  LoginRequest,
  RegisterAccountRequest,
  SignoutRequest,
} from "@celeb-chat/shared/src/api/Requests/auth.requests";
import {
  JWTResLocals,
  JWTUtils,
  ControllerErrors,
  Controller,
  Loc,
} from "@/Utils";
import { CallbackError } from "mongoose";
import { TUserDocSaveErr } from "@/Models/User/userHelpers";
import db from "@/Models";
import { TUserDocLocals } from "@/Middleware/User.middleware";
import { validateRegistrationInput } from "@celeb-chat/shared/src/schema";

export const RegisterUserController =
  Controller<RegisterAccountRequest.Request>(async (req, res) => {
    const { error } = new ControllerErrors(res, RegisterAccountRequest.Errors);

    const inputValidationError = await validateRegistrationInput({
      ...req.body,
      passwordConfirmation: req.body.password,
    });

    if (inputValidationError) {
      return error.InvalidFieldInput(inputValidationError);
    }

    /** Hash used as identifier to enforce single use of refresh tokens */
    const newTokenHash = await JWTUtils.generateHash();

    const newUser: Pick<
      UserModel.User,
      "email" | "jwtHash" | "password" | "username"
    > = {
      email: req.body.email.toLowerCase().trim(),
      password: req.body.password,
      username: req.body.username.trim(),
      jwtHash: { [newTokenHash]: true },
    };

    db.User.create(
      newUser,
      async (err: CallbackError | TUserDocSaveErr, user) => {
        if (err && !(err instanceof global.Error) && err.reason) {
          switch (err.reason) {
            case "emailOrUsernameTaken":
              return err.duplicateKey === "email"
                ? error.EmailTaken()
                : error.UsernameTaken();
            default:
              return error.InternalServerError(undefined, err);
          }
        } else if (err) {
          return error.InternalServerError(undefined, err);
        }

        // generate auth tokens and set them in response header
        const { tokens } = await JWTUtils.generateAndSetTokens(
          user.id,
          res,
          newTokenHash
        );

        if (!tokens) {
          return error.InternalServerError(
            undefined,
            Loc.Server.Auth.NoTokensGenerated
          );
        }

        const userJSON = await user.toShallowJSON();

        return res.json(userJSON).end();
      }
    );
  });

export const LoginUserController = Controller<LoginRequest.Request>(
  async (req, res) => {
    const emailOrUsername = req.body.emailOrUsername.trim();
    const { error } = new ControllerErrors(res, LoginRequest.Errors);

    db.User.findOne(
      {
        $or: [
          { email: emailOrUsername.toLowerCase() },
          { username: emailOrUsername },
        ],
      },
      async (err: CallbackError, user: UserModel.Document) => {
        if (err || !user) {
          return error.InvalidEmailOrPassword();
        }

        const isValidPassword = await user.validatePassword(req.body.password);

        if (!isValidPassword) {
          return error.InvalidEmailOrPassword();
        }

        // generate and set auth tokens in response header
        const { tokenHashId, tokens } = await JWTUtils.generateAndSetTokens(
          user.id,
          res
        );

        if (!tokens) {
          return error.InternalServerError(
            undefined,
            Loc.Server.Auth.NoTokensDuringLogin
          );
        }

        // add jwt id to user's doc in db
        await user.addJWTHash(tokenHashId);

        const userJSON = await user.toShallowJSON();

        return res.json(userJSON).end();
      }
    );
  }
);

// /** Signs user out of all devices by invalidating all refresh tokens */
export const SignoutUserController = Controller<
  SignoutRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { error } = new ControllerErrors(res, SignoutRequest.Errors);
  const user = res.locals.user;

  user.jwtHash = {};
  user.markModified("jwtHash");

  JWTUtils.destroyTokenCookie(res);

  await user.save();

  res.json({}).end();
});

/** Checks the auth status of the user */
export const AuthStatusController = Controller<
  AuthStatusRequest.Request,
  JWTResLocals
>(async (req, res) => {
  // if this controller is being executed, we know the user's auth status is valid
  res.json({}).end();
});
