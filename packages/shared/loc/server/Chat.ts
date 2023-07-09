import { ChatUtils } from "../../src/utils/ChatUtils";

export const Chat = {
  ChatNotFound: "Chat not found",
  UnauthorizedChat:
    "Whoa there, this chat isn't on your list. Let's stick to your own chats, okay?",
  CreateChat: {
    InvalidField: "Input does not match required format.",
    MaxChatLimitReached: `Hold up, you've already got the maximum number of chats going! Need to clear some space before starting a new one.`,
  },
  DeleteChat: {
    InternalErr:
      "Oops, something's up on our end. We couldn't delete your chat this time. Give it another try!",
  },
  UpdateChat: {
    InternalErr:
      "Whoops, we hit a snag. Couldn't update your chat this time. Try again, will you?",
  },

  CreationErr:
    "Oops, looks like our servers are having a hiccup. Couldn't create the chat this time. Please try again in a few moments!",
  JSONConversionErr: "An error occurred while converting a chat to a JSON",
  DeletionErr:
    "An error occurred while removing a chat from a user's chat list",
  UpdateErr: "An error occurred while updating a chat",
  SaveErr: "An error occurred while saving a chat.",
} as const;
