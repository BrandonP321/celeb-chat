import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";

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
    id: this.id,
    ownerId: this.ownerId,
    description: this.description,
    messages: this.messages,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
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

const addMsg: ChatModel.InstanceMethods["addMsg"] = async function (msg) {
  this.messages.push(msg);
  this.markModified("messages");
};

export const ChatMethods: ChatModel.InstanceMethods = {
  addMsg,
  toFullJSON,
  toFullChatJSON,
  toJSONWithoutMessages,
};
