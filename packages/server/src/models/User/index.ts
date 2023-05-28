import mongoose, { Schema } from "mongoose";
import { RegexUtils } from "@celeb-chat/shared/src/utils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import bcrypt from "bcrypt";
import { UserMethods } from "./userMethods";
import { handleUserDocSaveErr } from "./userHelpers";

const UserSchema: UserModel.Schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email required"],
      match: [RegexUtils.emailRegex, "Invalid email for user doc"],
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      match: [RegexUtils.passwordRegex, "Invalid password for user doc"],
    },
    username: {
      type: String,
      required: [true, "Username required"],
      index: true,
      unique: true,
    },
    jwtHash: {
      type: Schema.Types.Mixed,
      default: {},
    },
    chats: {
      type: Schema.Types.Mixed,
      default: [],
    },
  },
  { timestamps: true }
);

/** Hashes password before storing new document */
UserSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

    return next();
  } catch (err) {
    if (err instanceof NativeError || err === null) {
      return next(err);
    }
  }
});

/** Handles any errors that prevent doc from being created */
UserSchema.post("save", handleUserDocSaveErr);

UserSchema.methods = {
  ...UserSchema.methods,
  ...UserMethods,
};

export const User: UserModel.Model = mongoose.model("User", UserSchema);
