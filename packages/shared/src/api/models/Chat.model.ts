import {
  ResponseJSON,
  TDefaultModelProps,
  TMongooseDoc,
  TMongooseModel,
  TMongooseSchema,
} from ".";
import { Message, TChat } from "../../utils/ChatUtils";
import { UserModel } from "./User.model";

export namespace ChatModel {
  export type Chat = TDefaultModelProps & {
    description: string;
    chatSummary?: string;
    ownerId: string;
    messagesSinceLastSummary: number;
    msgCount: number;
    messages: Message[];
  };

  export type NewChat = Pick<Chat, "ownerId" | "description">;

  export type Document = TMongooseDoc<Chat, InstanceMethods>;
  export type Schema = TMongooseSchema<Chat, InstanceMethods, StaticMethods>;
  export type Model = TMongooseModel<Chat, InstanceMethods, Schema>;

  export type InstanceMethods = {
    toFullJSON: (this: Document) => FullJSON;
    toFullMessagelessJSON: (
      this: Omit<Document, "messages">
    ) => Omit<FullJSON, "messages">;
    /** returns chat JSON with messages */
    toFullChatJSON: (
      this: Document,
      user: UserModel.Document
    ) => Promise<FullChatJSON | undefined>;
    /** Returns chat JSON without messages */
    toJSONWithoutMessages: (
      this: Document,
      user: UserModel.Document
    ) => Promise<FullChatJSONWithoutMessages | undefined>;
    addMsg: (this: Document, ...msg: IndexlessMessage[]) => Promise<boolean>;
    getTrainingMsg: (this: Document) => Promise<IndexlessMessage>;
    incrememtMsgCount: (this: Document, add?: number) => void;
  };

  export type StaticMethods = {};

  export type FullJSON = ResponseJSON<
    Omit<Chat, "chatSummary" | "messagesSinceLastSummary">
  >;
  /** Includes all required properties from both the User & Chat models */
  export type FullChatJSON = FullJSON & UserModel.ChatJSON;
  /** Full chat JSON without messages */
  export type FullChatJSONWithoutMessages = Omit<FullChatJSON, "messages">;
  export type MessagesJSON = Pick<FullJSON, "messages">;
  export type IndexlessMessage = Omit<Message, "index">;
}
