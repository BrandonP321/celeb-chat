import { Mailer, StripeUtils } from "@/Utils";
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
      isEmailVerified: this.isEmailVerified,
      subscription: this.subscription,
      subscriptionTier: StripeUtils.getSubscriptionTier(this),
      stripeCustomerId: this.stripeCustomerId,
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
    emailVerification: true,
  };

  const strippedUser = {
    ...user,
    subscriptionTier: StripeUtils.getSubscriptionTier(user),
  };

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
};

/** See {@link UserModel.InstanceMethods.removeJWTHash} */
const removeJWTHash: UserModel.InstanceMethods["removeJWTHash"] =
  async function (this: UserModel.Document, hash) {
    const newJwtHashObj = { ...this.jwtHash };
    delete newJwtHashObj[hash];

    this.jwtHash = newJwtHashObj;
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

  const isChatRemoved = filteredChats.length < this.chats.length;
  this.chats = filteredChats;

  isChatRemoved && this.updateChatCount();

  return isChatRemoved;
};

const getMonthString = () => {
  const date = new Date();
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1;

  return `${year}-${month}`;
};

const getDateString = () => {
  const date = new Date();
  const day = date.getUTCDate();

  return `${getMonthString}-${day}`;
};

const defaultChatStats: UserModel.ChatMonthlyStats = {
  chatCount: 0,
  totalCharsInAIResponse: 0,
  totalAIResponses: 0,
  avgCharsInAIResponse: 0,
};

const getChatMonthStats = (
  user: UserModel.Document,
  monthString = getMonthString()
) => user.stats.chats.monthly[monthString] ?? defaultChatStats;

const updateAIResponseStats: UserModel.InstanceMethods["updateAIResponseStats"] =
  async function (newMsgLength) {
    if (!newMsgLength) {
      return;
    }

    const monthString = getMonthString();

    const stats = getChatMonthStats(this, monthString);

    stats.totalAIResponses += 1;
    stats.totalCharsInAIResponse += newMsgLength;

    stats.avgCharsInAIResponse = Math.floor(
      stats.totalCharsInAIResponse / stats.totalAIResponses
    );

    this.stats.chats.monthly[monthString] = stats;

    this.markModified("stats");
  };

const updateChatCount: UserModel.InstanceMethods["updateChatCount"] =
  async function () {
    const monthString = getMonthString();

    const stats = getChatMonthStats(this, monthString);

    stats.chatCount = this.chats.length;

    this.stats.chats.monthly[monthString] = stats;

    this.markModified("stats");
  };

const defaultMsgStats: UserModel.MsgMonthlyStats = {
  avgMsgLength: 0,
  msgCount: 0,
  totalCharsSent: 0,
};

const updateMsgStats: UserModel.InstanceMethods["updateMsgStats"] =
  async function (newMsgLength) {
    const monthString = getMonthString();

    const stats = this.stats.msg.monthly[monthString] ?? defaultMsgStats;

    stats.msgCount += 1;
    stats.totalCharsSent += newMsgLength;
    stats.avgMsgLength = stats.totalCharsSent / stats.msgCount;

    this.stats.msg.monthly[monthString] = stats;

    this.markModified("stats");
  };

const defaultTokenStats: UserModel.TokenMonthlyStats = {
  tokenCount: 0,
};

const updateTokenCount: UserModel.InstanceMethods["updateTokenCount"] =
  async function (tokens) {
    const monthString = getMonthString();

    const stats = this.stats.tokens.monthly[monthString] ?? defaultTokenStats;

    stats.tokenCount += tokens;

    this.stats.tokens.monthly[monthString] = stats;

    this.markModified("stats");
  };

const updateVerificationRequest: UserModel.InstanceMethods["updateVerificationRequest"] =
  async function () {
    const hash = await bcrypt.hash(process.env.SECRET ?? "", 10);

    this.emailVerification = {
      hash,
      dateRequested: Date.now(),
      emailToVerify: this.email,
    };

    return { encodedHash: encodeURI(hash) };
  };

const sendVerificationEmail: UserModel.InstanceMethods["sendVerificationEmail"] =
  async function () {
    const { encodedHash } = await this.updateVerificationRequest();
    console.log(this.id);

    Mailer.sendEmailVerificationEmail({
      to: this.email,
      hash: encodedHash,
      userId: this.id,
      username: this.username,
    });
  };

export const UserMethods: UserModel.InstanceMethods = {
  sendVerificationEmail,
  updateVerificationRequest,
  removeChat,
  updateChat,
  getChatIndex,
  getChatJSON,
  toFullJSON,
  toShallowJSON,
  validatePassword,
  addJWTHash,
  removeJWTHash,
  updateAIResponseStats,
  updateChatCount,
  updateMsgStats,
  updateTokenCount,
};
