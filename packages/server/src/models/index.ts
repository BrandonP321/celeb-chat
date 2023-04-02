import mongoose from "mongoose";
import { User } from "./User";

export const connectToMongoDb = () => {
  mongoose.connect(
    process.env.MONGODB_URI ?? "mongodb://127.0.0.1/celeb-chat",
    {}
  );
};

export default {
  User,
};