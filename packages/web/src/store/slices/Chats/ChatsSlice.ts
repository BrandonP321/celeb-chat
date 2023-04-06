import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { Message, TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessagelessChat = Omit<TChat, "messages">;

export interface ChatsState {
  /** Map of chats that have had their messages fetched */
  chatCache: {
    [key: string]: Pick<TChat, "messages"> | undefined;
  };
  /** Ordered list of chats without messages, which are fetched when a chat is loaded */
  chats: UserModel.UserChat[] | null;
}

const initialState: ChatsState = {
  chatCache: {},
  chats: null,
};

/** Updates a cached chat, adding the chat to the cache if it doesn't already exist */
const updateCachedChat = (
  state: ChatsState,
  chatId: string,
  messages: Message[]
) => {
  state.chatCache = {
    ...state.chatCache,
    [chatId]: {
      messages,
    },
  };
};

/**
 * Contains the loading status of the site and/or page
 */
const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setChats: (state, { payload }: PayloadAction<UserModel.UserChat[]>) => {
      state.chats = payload;
    },
    cacheFetchedMessages: (
      state,
      { payload }: PayloadAction<Pick<TChat, "messages" | "id">>
    ) => {
      updateCachedChat(state, payload.id, payload.messages);
    },
    addChat: (state, { payload }: PayloadAction<UserModel.UserChat>) => {
      state.chats = [payload, ...(state.chats ?? [])];

      updateCachedChat(state, payload.id, []);
    },
    addMsg: (
      state,
      { payload }: PayloadAction<{ chatId: string; message: Message }>
    ) => {
      const cachedChat = state.chatCache[payload.chatId];

      updateCachedChat(state, payload.chatId, [
        ...(cachedChat?.messages ?? []),
        payload.message,
      ]);
    },
  },
});

export const { addChat, addMsg, setChats, cacheFetchedMessages } =
  chatsSlice.actions;
export default chatsSlice.reducer;
