import {
  CreatePasswordResetRequest,
  GetUserAuthRequest,
  GetUserChatsRequest,
  GetUserRequest,
  ResetPasswordRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import { validatePasswordResetInput } from "@celeb-chat/shared/src/schema/ResetPasswordSchema";
import { TUserDocLocals } from "@/Middleware";
import { Controller, ControllerErrors, Loc, Mailer } from "@/Utils";
import db from "@/Models";
import bcrypt from "bcrypt";

/** Returns full user JSON without sensitive data */
export const GetUserController = Controller<
  GetUserRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  return res.json(await res.locals.user.toFullJSON()).end();
});

/** Returns basic user info  */
export const GetUserAuthController = Controller<
  GetUserAuthRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  return res.json(await res.locals.user.toShallowJSON()).end();
});

export const GetUserChatsController = Controller<
  GetUserChatsRequest.Request,
  TUserDocLocals
>(async (req, res) => {
  const { user } = res.locals;

  res.json({ chats: user.chats }).end();
});

export const CreatePasswordResetRequestController =
  Controller<CreatePasswordResetRequest.Request>(async (req, res) => {
    const { email } = req.body;
    const { error } = new ControllerErrors(
      res,
      CreatePasswordResetRequest.Errors
    );

    if (!email) {
      return error.EmailRequired();
    }

    // verify password reset requrest does not exist for email
    const request = await db.PasswordReset.findOne({ email });

    const confirmationHash = await bcrypt.hash(process.env.SECRET ?? "", 10);
    let confirmationId: string;

    try {
      // Verify email belongs to an account
      const count = await db.User.count({ email });

      if (count === 0) {
        return res.json({}).end();
      }
    } catch (err) {
      // TODO: log this error without sending error to client
      return res.json({}).end();
    }

    // If request already exists, replace hash
    if (request) {
      confirmationId = request.id;
      request.confirmationHash = confirmationHash;
      request.requestCreationTime = Date.now();

      await request.save();
    } else {
      // Else create new request
      const newRequest = await db.PasswordReset.create({
        email,
        confirmationHash,
        requestCreationTime: Date.now(),
      });

      confirmationId = newRequest.id;
    }

    try {
      await Mailer.sendPasswordResetEmail({
        to: email,
        confirmationHash,
        confirmationId,
      });
    } catch (err) {
      return error.UnableToSendEmail(undefined, err);
    }

    return res.json({}).end();
  });

// Request should last 24 hours
const requestLifeSpan = 24 * 60 * 60 * 1000;

export const ResetPasswordController = Controller<ResetPasswordRequest.Request>(
  async (req, res) => {
    const { error } = new ControllerErrors(res, ResetPasswordRequest.Errors);
    const { confirmationHash, confirmationId, password } = req.body;

    if (!confirmationHash || !confirmationId) {
      return error.MissingConfirmationData();
    }

    const inputValidationErr = await validatePasswordResetInput(req.body);

    if (inputValidationErr) {
      return error.InvalidInput(inputValidationErr);
    }

    const request = await db.PasswordReset.findById(confirmationId);

    if (!request) {
      return error.RequestNotFound();
    } else if (request.requestCreationTime + requestLifeSpan >= Date.now()) {
      return error.RequestExpired();
    } else if (request.confirmationHash !== confirmationHash) {
      return error.IncorrectHash();
    }

    const user = await db.User.findOne({ email: request.email });

    if (!user) {
      return error.UserNotFound(Loc.Server.User.UserNotFound);
    }

    user.password = password;

    await user.save();
    await request.delete();

    return res.json({}).end();
  }
);
