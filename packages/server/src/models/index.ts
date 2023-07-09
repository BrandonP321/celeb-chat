import mongoose from "mongoose";
import { User } from "./User";
import { Chat } from "./Chat";
import { PasswordReset } from "./PasswordReset";

export const connectToMongoDb = () => {
  mongoose.connect(
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1/celeb-chat",
    {}
  );

  // mongoose.set("debug", true);
};

export default {
  User,
  Chat,
  PasswordReset,
};
