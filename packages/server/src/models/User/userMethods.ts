import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import bcrypt from "bcrypt";

/** See {@link UserModel.InstanceMethods.toFullJSON} */
const toFullJSON: UserModel.InstanceMethods["toFullJSON"] = async function (
  this: UserModel.Document
) {
  // flatten user JSON and remove sensitive fields
  const userJSON = this.toJSON();
  userJSON.id = this.id;

  return removeSensitiveData(userJSON);
};

/** See {@link UserModel.InstanceMethods.toShallowJSON} */
const toShallowJSON: UserModel.InstanceMethods["toShallowJSON"] =
  async function (this: UserModel.Document) {
    return {
      email: this.email,
      id: this.id,
      username: this.username,
    };
  };

/** See {@link UserModel.InstanceMethods.validatePassword} */
const validatePassword: UserModel.InstanceMethods["validatePassword"] =
  async function (this: UserModel.Document, password: string) {
    return bcrypt.compare(password, this.password);
  };

/** Removes sensitive data from user JSON */
const removeSensitiveData = function (
  user: UserModel.User
): UserModel.FullJSON {
  // properties that need to be removed from user JSON
  const sensitiveFields: { [key in UserModel.SensitiveFields]: true } = {
    jwtHash: true,
    password: true,
  };

  const strippedUser = { ...user };

  // remove each field from user JSON
  let field: UserModel.SensitiveFields;
  for (field in sensitiveFields) {
    delete strippedUser[field];
  }

  return strippedUser;
};

/** See {@link UserModel.InstanceMethods.addJWTHash} */
const addJWTHash: UserModel.InstanceMethods["addJWTHash"] = async function (
  this: UserModel.Document,
  hash
) {
  this.jwtHash = { ...(this.jwtHash ?? {}), [hash]: true };
  await this.save();
};

/** See {@link UserModel.InstanceMethods.removeJWTHash} */
const removeJWTHash: UserModel.InstanceMethods["removeJWTHash"] =
  async function (this: UserModel.Document, hash) {
    const newJwtHashObj = { ...this.jwtHash };
    delete newJwtHashObj[hash];

    this.jwtHash = newJwtHashObj;
    await this.save();
  };

const getChatJSON: UserModel.InstanceMethods["getChatJSON"] = async function (
  chatId
) {
  const chat = this.chats?.find((c) => c.id === chatId);

  return chat;
};

const getChatIndex: UserModel.InstanceMethods["getChatIndex"] = async function (
  chatId
) {
  const chat = this.chats?.findIndex((c) => c.id === chatId);

  return chat;
};

const updateChat: UserModel.InstanceMethods["updateChat"] = async function (
  chatId,
  chatUpdate
) {
  const chatIndex = await this.getChatIndex(chatId);

  if (chatIndex === -1) {
    return false;
  }

  this.chats[chatIndex] = {
    ...this.chats[chatIndex],
    ...chatUpdate,
  };
  this.markModified("chats");

  return true;
};

const removeChat: UserModel.InstanceMethods["removeChat"] = async function (
  chatId
) {
  const filteredChats = this.chats.filter((c) => c.id !== chatId);

  const wasChatRemoved = filteredChats.length < this.chats.length;
  this.chats = filteredChats;

  return wasChatRemoved;
};

export const UserMethods: UserModel.InstanceMethods = {
  removeChat,
  updateChat,
  getChatIndex,
  getChatJSON,
  toFullJSON,
  toShallowJSON,
  validatePassword,
  addJWTHash,
  removeJWTHash,
};
