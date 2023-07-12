import mongoose, { Schema } from "mongoose";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { ChatMethods } from "./chatMethods";

const ChatSchema: ChatModel.Schema = new Schema(
  {
    description: {
      type: String,
    },
    chatSummary: {
      type: String,
    },
    customMsg: {
      type: String,
    },
    messages: {
      type: Schema.Types.Mixed,
      default: [],
    },
    msgCount: {
      type: Number,
      default: 0,
    },
    messagesSinceLastSummary: {
      type: Number,
      default: 0,
    },
    ownerId: {
      type: String,
      required: [true, "Owner ID is required to create a chat"],
    },
  },
  { timestamps: true }
);

ChatSchema.methods = {
  ...ChatSchema.methods,
  ...ChatMethods,
};

export const Chat: ChatModel.Model = mongoose.model("Chat", ChatSchema);
