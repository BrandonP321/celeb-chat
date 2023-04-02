import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TChat, TMessage } from "data/mock/mockChats";

export type MessagelessChat = Omit<TChat, "messages">;

export interface ChatsState {
  /** Map of chats that have had their messages fetched */
  chatCache: {
    [key: string]: TChat | undefined;
  };
  /** Ordered list of chats without messages, which are fetched when a chat is loaded */
  chats: MessagelessChat[] | null;
}

const initialState: ChatsState = {
  chatCache: {},
  chats: null,
};

/** Updates a cached chat, adding the chat to the cache if it doesn't already exist */
const updateCachedChat = (
  state: ChatsState,
  chat: MessagelessChat,
  messages: TMessage[]
) => {
  const cachedChat = state.chatCache[chat.id];

  state.chatCache = {
    ...state.chatCache,
    [chat.id]: {
      ...(cachedChat ?? chat),
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
    setChats: (state, { payload }: PayloadAction<MessagelessChat[]>) => {
      state.chats = payload;
    },
    cacheFetchedMessages: (state, { payload }: PayloadAction<TChat>) => {
      updateCachedChat(state, payload, payload.messages);
    },
    addChat: (state, { payload }: PayloadAction<TChat>) => {
      state.chats = [payload, ...(state.chats ?? [])];

      updateCachedChat(state, payload, payload.messages);
    },
    addMsg: (
      state,
      { payload }: PayloadAction<{ chat: TChat; message: TMessage }>
    ) => {
      const cachedChat = state.chatCache[payload.chat.id];

      updateCachedChat(state, payload.chat, [
        ...(cachedChat?.messages ?? []),
        payload.message,
      ]);
    },
  },
});

export const { addChat, addMsg, setChats, cacheFetchedMessages } =
  chatsSlice.actions;
export default chatsSlice.reducer;
