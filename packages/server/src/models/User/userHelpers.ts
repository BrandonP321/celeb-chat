import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";

export type TUserDocSaveErr = {
  reason?: "emailOrUsernameTaken";
  duplicateKey?: "email" | "username";
};

type TDocSaveErr = Error & {
  code?: number;
  [key: string]: any;
};

const DuplicateUniqueKeyErrCode = 11000;

/** Attempts to handle any errors that occurr while saving a User document */
export const handleUserDocSaveErr = async function (
  err: TDocSaveErr,
  doc: UserModel.Document,
  next: (err: any) => void
) {
  const errObj: TUserDocSaveErr = { reason: undefined };

  // if a unique field has a duplicate key, report error
  if (err.code === DuplicateUniqueKeyErrCode && err.keyPattern) {
    try {
      errObj.reason = "emailOrUsernameTaken";
      errObj.duplicateKey = Object.keys(err.keyPattern)?.[0] as
        | "email"
        | "username";
    } catch (err) {}
  }

  next(errObj.reason ? errObj : err);
};
