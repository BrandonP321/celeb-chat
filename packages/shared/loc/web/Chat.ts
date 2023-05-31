export const Chat = {
  SideBar: {
    LoadingChats: "Loading chats",
    SearchPlaceholder: "Search for chat",
  },
  EditChat: "Edit Chat",
  DeleteChat: "DeleteChat",
  ChatModalTitle: "Options for Chat: ",
  ChatNotFound: "Chat Not Found",
  ChatNotFoundDesc:
    "Whoops! The chat you're looking for seems to be off the grid. It may have been deleted or does not exist. Time to start a new adventure, perhaps?",
  Message: "Message",
  LoadMoreMsg: "Load more messages",
  LoadingMsgs: "Loading messages",
  EmptyChatTitle: "Get the conversation started",
  EmptyChatDesc: (name: string) => `Send your first message to ${name} now.`,

  /* Delete Chat Modal */
  ChatDeleted: "Chat successfully deleted",
  DeleteChatTitle: "Delete Chat",
  DeleteBlurbPrefix: "Are you sure you want to delete your chat with ",
  DeleteBlurbSuffix:
    "? This action is permanent and cannot be undone. Take a moment to consider before you say goodbye.",
  DeleteChatModalDelBtn: "Delete",
  DeleteChatModalDeleting: "Deleting",

  /* Message Options Modal */
  MsgOptionsModalTitle: "Message Options",

  /* Chat Sidebar */
  NoChatsFound: "No Chats Found",
  NoChatCTAPrefix: "Start a chat with ",

  Meta: {
    Title: (name?: string) => name,
  },
};
