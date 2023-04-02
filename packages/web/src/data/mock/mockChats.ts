import { ChatCompletionRequestMessage } from "openai";
import { ChatUtils } from "utils";

export type TMessage = ChatCompletionRequestMessage & {};

export type TChat = {
  id: string;
  displayName: string;
  recipientDescription: string;
  lastMessage?: string;
  messages: TMessage[];
};

const getTrainingMsg = (character: string) =>
  ChatUtils.constructMsg(
    `For the rest of this conversation, you will be texting me while impersonating ${character}.  Specifically, you will also take on any stereotypical traits of ${character}.  Also, if ${character} has any specific speech patterns, attempt to mimic those speech patterns in your response.`
  );

export const mockChats: TChat[] = [
  {
    id: "1",
    displayName: "Dumbledore",
    recipientDescription: "Dumbledore from the sixth harry potter movie",
    messages: [getTrainingMsg("Dumbledore from the sixth harry potter movie")],
    lastMessage: "Hello there",
  },
  {
    id: "2",
    displayName: "Donald Trump",
    recipientDescription: "Donald Trump",
    messages: [getTrainingMsg("Donald Trump")],
    lastMessage: "I am Donald Trump!",
  },
  {
    id: "3",
    displayName: "Captain Jack Sparrow",
    recipientDescription: "A flambouant version of Captain Jack Sparrow",
    messages: [getTrainingMsg("A flambouant version of Captain Jack Sparrow")],
    lastMessage: "Argh Mat'y",
  },
];
