import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import {
  AuthStatusRequest,
  LoginRequest,
  // AuthStatusRequest,
  // LoginUserRequest,
  // RegisterUserRequest,
  // ReqUserLoginErrors,
  // ReqUserRegisterErrors,
  // SignoutUserRequest,
  RegisterAccountRequest,
  SignoutRequest,
} from "@celeb-chat/shared/src/api/Requests/auth.requests";
// import { AuthUtils } from "@celeb-chat/shared/src/utils/AuthUtils";
import { JWTResLocals, JWTUtils, ControllerErrors } from "@/Utils";
import { TRouteController } from ".";
import { CallbackError } from "mongoose";
import { TUserDocSaveErr } from "@/Models/User/userHelpers";
import db from "@/Models";
import { TUserDocLocals } from "@/Middleware/GetUser.middleware";

const registrationErrors = new ControllerErrors(RegisterAccountRequest.Errors);

export const RegisterUserController: TRouteController<
  RegisterAccountRequest.Request,
  {}
> = async (req, res) => {
  // TODO: implement input validation
  // const inputValidationErrors = AuthUtils.ValidateRegistrationFields(req.body);

  // if (Object.keys(inputValidationErrors).length > 0) {
  //   return registrationErrors.error.InvalidFieldInput(res);
  // }

  /** Hash used as identifier to enforce single use of refresh tokens */
  const newTokenHash = await JWTUtils.generateHash();

  const newUser: Pick<
    UserModel.User,
    "email" | "jwtHash" | "password" | "username"
  > = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
    jwtHash: { [newTokenHash]: true },
  };

  db.User.create(
    newUser,
    async (err: CallbackError | TUserDocSaveErr, user) => {
      if (err && !(err instanceof global.Error) && err.reason) {
        switch (err.reason) {
          case "emailOrUsernameTaken":
            return err.duplicateKey === "email"
              ? registrationErrors.error.EmailTaken(res)
              : registrationErrors.error.UsernameTaken(res);
          default:
            return registrationErrors.error.InternalServerError(res);
        }
      } else if (err) {
        return registrationErrors.error.InternalServerError(res);
      }

      // generate auth tokens and set them in response header
      const { tokens } = await JWTUtils.generateAndSetTokens(
        user.id,
        res,
        newTokenHash
      );

      if (!tokens) {
        return registrationErrors.error.InternalServerError(res);
      }

      const userJSON = await user.toShallowJSON();

      return res.json(userJSON).end();
    }
  );
};

const loginErrors = new ControllerErrors(LoginRequest.Errors);

export const LoginUserController: TRouteController<
  LoginRequest.Request,
  {}
> = async (req, res) => {
  // TODO: implement input validation
  // const inputValidationErrors = AuthUtils.ValidateLoginFields(req.body);

  // if (Object.keys(inputValidationErrors).length > 0) {
  //   return ControllerUtils.respondWithErr(
  //     ReqUserLoginErrors.InvalidFieldInput({
  //       invalidFields: inputValidationErrors,
  //     }),
  //     res
  //   );
  // }

  db.User.findOne(
    { email: req.body.email },
    async (err: CallbackError, user: UserModel.Document) => {
      if (err || !user) {
        return loginErrors.error.InvalidEmailOrPassword(res);
      }

      const isValidPassword = await user.validatePassword(req.body.password);

      if (!isValidPassword) {
        return loginErrors.error.InvalidEmailOrPassword(res);
      }

      // generate and set auth tokens in response header
      const { tokenHashId, tokens } = await JWTUtils.generateAndSetTokens(
        user.id,
        res
      );

      if (!tokens) {
        return loginErrors.error.InternalServerError(res);
      }

      // add jwt id to user's doc in db
      await user.addJWTHash(tokenHashId);

      const userJSON = await user.toShallowJSON();

      return res.json(userJSON).end();
    }
  );
};

const signoutErrors = new ControllerErrors(SignoutRequest.Errors);

// /** Signs user out of all devices by invalidating all refresh tokens */
export const SignoutUserController: TRouteController<
  SignoutRequest.Request,
  TUserDocLocals
> = async (req, res) => {
  try {
    const user = res.locals.user;

    user.jwtHash = {};
    user.markModified("jwtHash");
    await user.save();

    res.json({}).end();
  } catch (err) {
    return signoutErrors.error.InternalServerError(res);
  }
};

/** Checks the auth status of the user */
export const AuthStatusController: TRouteController<
  AuthStatusRequest.Request,
  JWTResLocals
> = async (req, res) => {
  // if this controller is being executed, we know the user's auth status is valid
  res.json({}).end();
};
