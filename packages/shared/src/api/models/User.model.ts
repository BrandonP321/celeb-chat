import {
  ResponseJSON,
  TDefaultModelProps,
  TMongooseDoc,
  TMongooseModel,
  TMongooseSchema,
} from ".";

export namespace UserModel {
  export type User = TDefaultModelProps & {
    email: string;
    password: string;
    username: string;
    jwtHash: { [key: string]: boolean };
    chats: UserChat[];
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
  };

  export type StaticMethods = {};

  /** User JSON with all data */
  export type FullJSON = ResponseJSON<Omit<User, SensitiveFields>>;
  /** User JSON with only essential data for auth */
  export type ShallowJSON = ResponseJSON<
    Pick<FullJSON, "email" | "username" | "id">
  >;
  /** Includes chat properties found on User model */
  export type ChatJSON = Omit<UserChat, "id">;

  /** Sensitive fields that should not be included in API response */
  export type SensitiveFields = "password" | "jwtHash";

  export type UserChat = {
    id: string;
    displayName: string;
    lastMessage?: string;
  };
}
