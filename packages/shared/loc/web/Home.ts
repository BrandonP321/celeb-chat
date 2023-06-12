import { Common } from "../common";

export const Home = {
  Title: `Welcome to ${Common.AppName}`,

  ChatForm: {
    Title: "Who would you like to chat with?",
    CharacterPlaceholder: "Some person",
    SubmitBtnText: "Start chatting",
  },
} as const;
