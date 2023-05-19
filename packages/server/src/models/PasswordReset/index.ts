import mongoose, { Schema } from "mongoose";
import { PasswordResetModel } from "@celeb-chat/shared/src/api/models/PasswordReset.model";

const PasswordResetSchema: PasswordResetModel.Schema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: [true, "Email required"],
      index: true,
    },
    confirmationHash: {
      type: String,
      required: [true, "Confirmation hash required"],
    },
    requestCreationTime: {
      type: Number,
      required: [true, "Request creation time required"],
    },
  },
  { timestamps: true }
);

export const PasswordReset: PasswordResetModel.Model = mongoose.model(
  "PasswordReset",
  PasswordResetSchema
);
