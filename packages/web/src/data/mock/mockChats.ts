import { ChatCompletionRequestMessage } from "openai";

export type TMessage = ChatCompletionRequestMessage & {};

export type TChat = {
  id: string;
  displayName: string;
  recipientDescription: string;
  lastMessage: string;
  messages: TMessage[];
};

export const mockChats: TChat[] = [
  {
    id: "1",
    displayName: "Dumbledore",
    recipientDescription: "Dumbledore from the sixth harry potter movie",
    messages: [],
    lastMessage: "Hello there",
  },
  {
    id: "2",
    displayName: "Donald Trump",
    recipientDescription: "Donald Trump",
    messages: [],
    lastMessage: "I am Donald Trump!",
  },
  {
    id: "3",
    displayName: "Captain Jack Sparrow",
    recipientDescription: "A flambouant version of Captain Jack Sparrow",
    messages: [],
    lastMessage: "Argh Mat'y",
  },
];
