import { Common } from "../common";

export const ChatHome = {
  PageTitle: `Welcome to ${Common.AppName}!`,
  PageDesc:
    "Get ready to jump into extraordinary conversations with the most fascinating figures you can imagine. Here, you're the director of the discourse, the maestro of the chat. Ready to get started?",
  CreateChat: {
    Header: "Add to Your Conversations",
    FirstChatHeader: "Create Your First Chat",
    Desc: "Feel like chatting with someone new? Create another chat and expand your universe of intriguing dialogues.",
    FirstChatDesc:
      "Begin your journey by setting up a chat with a celebrity, historical figure, or even a fictional character.",
    CTA: "Create chat",
  },
  ViewChats: {
    Header: "Explore Your Chats",
    Desc: "Venture into your personal universe of conversations and see where the dialogues take you.",
    CTA: "View Chats",
  },
} as const;
