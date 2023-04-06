import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";

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

const addMsg: ChatModel.InstanceMethods["addMsg"] = async function (...msg) {
  this.messages.push(...msg);
  this.markModified("messages");
};

const getTrainingMsg: ChatModel.InstanceMethods["getTrainingMsg"] =
  async function () {
    return ChatUtils.getTrainingMsg(this.description);
  };

export const ChatMethods: ChatModel.InstanceMethods = {
  getTrainingMsg,
  addMsg,
  toFullJSON,
  toFullChatJSON,
  toJSONWithoutMessages,
};
