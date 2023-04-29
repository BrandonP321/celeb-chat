import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { ChatUtils, Message } from "@celeb-chat/shared/src/utils/ChatUtils";
import db from "@/Models";
import mongoose from "mongoose";

const toFullChatJSON: ChatModel.InstanceMethods["toFullChatJSON"] =
  async function (user) {
    const userChatData = await user.getChatJSON(this.id);

    return (
      userChatData && {
        ...userChatData,
        ...this.toFullJSON(),
      }
    );
  };

const toFullJSON: ChatModel.InstanceMethods["toFullJSON"] = function () {
  return {
    ...this.toFullMessagelessJSON(),
    messages: this.messages,
  };
};

const toJSONWithoutMessages: ChatModel.InstanceMethods["toJSONWithoutMessages"] =
  async function (user) {
    const chatJSON = await this.toFullChatJSON(user);

    if (chatJSON) {
      const { messages, ...chat } = chatJSON;

      return chat;
    }

    return undefined;
  };

const addMsg: ChatModel.InstanceMethods["addMsg"] = async function (...msg) {
  const messages = msg?.map((m, i): Message => {
    const message = {
      ...m,
      index: this.msgCount,
    };
    this.incrememtMsgCount();

    return message;
  });

  try {
    const res = await db.Chat.updateOne(
      { _id: new mongoose.Types.ObjectId(this.id) },
      { $push: { messages: { $each: messages } } }
    );

    return true;
  } catch (err) {
    return false;
  }
};

const getTrainingMsg: ChatModel.InstanceMethods["getTrainingMsg"] =
  async function () {
    return ChatUtils.getTrainingMsg(this.description);
  };

const incrememtMsgCount: ChatModel.InstanceMethods["incrememtMsgCount"] =
  async function () {
    this.msgCount += 1;
    this.markModified("msgCount");
  };

const toFullMessagelessJSON: ChatModel.InstanceMethods["toFullMessagelessJSON"] =
  function () {
    return {
      id: this.id,
      ownerId: this.ownerId,
      description: this.description,
      msgCount: this.msgCount,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };

const updateChat: ChatModel.InstanceMethods["updateChat"] = async function (
  user,
  updates
) {
  try {
    const userChat = await user.getChatJSON(this.id);

    if (userChat) {
      user.updateChat(this.id, {
        displayName: updates.displayName ?? userChat.displayName,
      });

      return true;
    }
  } catch (err) {}

  return false;
};

export const ChatMethods: ChatModel.InstanceMethods = {
  updateChat,
  toFullMessagelessJSON,
  getTrainingMsg,
  incrememtMsgCount,
  addMsg,
  toFullJSON,
  toFullChatJSON,
  toJSONWithoutMessages,
};
