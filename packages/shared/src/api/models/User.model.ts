import {
  ResponseJSON,
  TDefaultModelProps,
  TMongooseDoc,
  TMongooseModel,
  TMongooseSchema,
} from ".";
import { SubScriptionTierMap, SubscriptionTier } from "../../utils/ChatUtils";

export namespace UserModel {
  export type User = TDefaultModelProps & {
    email: string;
    stripeCustomerId?: string;
    password: string;
    username: string;
    jwtHash: { [key: string]: boolean };
    isEmailVerified: boolean;
    subscription: Subscription;
    emailVerification?: {
      hash: string;
      emailToVerify: string;
      dateRequested: number;
    };
    chats: UserChat[];
    stats: UserStats;
  };

  export type Document = TMongooseDoc<User, InstanceMethods>;
  export type Schema = TMongooseSchema<User, InstanceMethods, StaticMethods>;
  export type Model = TMongooseModel<User, InstanceMethods, Schema>;

  export type InstanceMethods = {
    /** Returns user JSON with basic user data */
    toShallowJSON: () => Promise<ShallowJSON>;
    /** returns full user JSON without sensitive data */
    toFullJSON: () => Promise<FullJSON>;
    /** Validates password provided by user */
    validatePassword: (password: string) => Promise<boolean>;
    /** Adds new jwt ID to user's list of token IDs used to validate refresh tokens */
    addJWTHash: (hash: string) => Promise<void>;
    /** Removes jwt ID from user doc */
    removeJWTHash: (hash: string) => Promise<void>;
    /** Returns JSON with chat data */
    getChatJSON: (
      this: Document,
      chatId: string
    ) => Promise<ChatJSON | undefined>;
    getChatIndex: (this: Document, chatId: string) => Promise<number>;
    updateChat: (
      this: Document,
      chatId: string,
      chatUpdate: Partial<UserChat>
    ) => Promise<boolean>;
    removeChat: (this: Document, chatId: string) => Promise<boolean>;
    updateTokenCount: (this: Document, tokens: number) => Promise<void>;
    updateChatCount: (this: Document) => Promise<void>;
    updateAIResponseStats: (
      this: Document,
      newMsgLength?: number
    ) => Promise<void>;
    updateMsgStats: (this: Document, newMsgLength: number) => Promise<void>;
    updateVerificationRequest: (
      this: Document
    ) => Promise<{ encodedHash: string }>;
    sendVerificationEmail: (this: Document) => Promise<void>;
  };

  export type StaticMethods = {};

  /** User JSON with all data */
  export type FullJSON = ResponseJSON<Omit<User, SensitiveFields>>;
  /** User JSON with only essential data for auth */
  export type ShallowJSON = ResponseJSON<
    Pick<
      FullJSON,
      "email" | "username" | "id" | "isEmailVerified" | "subscription"
    >
  >;
  /** Includes chat properties found on User model */
  export type ChatJSON = Omit<UserChat, "id">;

  /** Sensitive fields that should not be included in API response */
  export type SensitiveFields = "password" | "jwtHash" | "emailVerification";

  export type UserChat = {
    id: string;
    displayName: string;
    lastMessage?: string;
  };

  export type ChatMonthlyStats = {
    chatCount: number;
    totalAIResponses: number;
    totalCharsInAIResponse: number;
    avgCharsInAIResponse: number;
  };

  export type TokenMonthlyStats = {
    tokenCount: number;
  };

  export type MsgMonthlyStats = {
    totalCharsSent: number;
    msgCount: number;
    avgMsgLength: number;
  };

  export type UserStats = {
    tokens: {
      monthly: {
        [month: string]: TokenMonthlyStats;
      };
    };
    chats: {
      monthly: {
        [month: string]: ChatMonthlyStats;
      };
    };
    msg: {
      monthly: {
        [month: string]: MsgMonthlyStats;
      };
    };
  };

  export type Subscription = {
    canceledAt: number | null;
    endedAt: number | null;
    tierToRenew: SubscriptionTier;
    renewalDate: number | null;
    isActive: boolean;
    plans: SubScriptionTierMap<SubscriptionPlan>;
  };

  export type SubscriptionPlan = {
    accessExpirationDate: number;
    accessStartDate: number;
  };
}
