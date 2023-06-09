import mongoose, { Schema } from "mongoose";
import { RegexUtils } from "@celeb-chat/shared/src/utils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import bcrypt from "bcrypt";
import { UserMethods } from "./userMethods";
import { handleUserDocSaveErr } from "./userHelpers";

const userStatsDefault: UserModel.UserStats = {
  tokens: {
    monthly: {},
  },
  chats: {
    monthly: {},
  },
  msg: {
    monthly: {},
  },
};

const UserSchema: UserModel.Schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "Email required"],
      index: true,
      unique: true,
    },
    stripeCustomerId: {
      type: String,
      index: true,
      unique: false,
    },
    subscription: {
      type: Schema.Types.Mixed,
      default: {
        canceledAt: null,
        endedAt: null,
        renewalDate: null,
        isActive: false,
        tierToRenew: "free",
        plans: {},
      },
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
    stats: {
      type: Schema.Types.Mixed,
      default: userStatsDefault,
    },
    isEmailVerified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    emailVerification: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: true, minimize: false }
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
