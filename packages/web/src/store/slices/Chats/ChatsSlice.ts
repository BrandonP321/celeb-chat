import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessagelessChat = Omit<TChat, "messages">;

export interface ChatsState {
  /** Map of chats that have had their messages fetched */
  chatCache: {
    [key: string]:
      | {
          messages: ChatModel.IndexlessMessage[];
          nextMarker?: number | null;
          isFetching: boolean;
        }
      | undefined;
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
  messages?: ChatModel.IndexlessMessage[],
  nextMarker?: number | null,
  isFetching?: boolean
) => {
  const cachedChat = state.chatCache?.[chatId];

  state.chatCache = {
    ...state.chatCache,
    [chatId]: {
      messages: messages ?? cachedChat?.messages ?? [],
      nextMarker:
        nextMarker !== undefined ? nextMarker : cachedChat?.nextMarker,
      isFetching: isFetching ?? false,
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
      {
        payload,
      }: PayloadAction<
        Pick<TChat, "messages" | "id"> & { nextMarker: number | null }
      >
    ) => {
      const cachedChat = state.chatCache?.[payload.id];

      updateCachedChat(
        state,
        payload.id,
        [...payload.messages, ...(cachedChat?.messages ?? [])],
        payload.nextMarker,
        false
      );
    },
    addChat: (state, { payload }: PayloadAction<UserModel.UserChat>) => {
      state.chats = [payload, ...(state.chats ?? [])];

      updateCachedChat(state, payload.id, [], undefined, false);
    },
    addMsg: (
      state,
      {
        payload,
      }: PayloadAction<{ chatId: string; message: ChatModel.IndexlessMessage }>
    ) => {
      const cachedChat = state.chatCache[payload.chatId];

      updateCachedChat(
        state,
        payload.chatId,
        [...(cachedChat?.messages ?? []), payload.message],
        undefined,
        false
      );
    },
    setChatFetchStatus: (
      state,
      { payload }: PayloadAction<{ isFetching: boolean; chatId: string }>
    ) => {
      updateCachedChat(
        state,
        payload.chatId,
        undefined,
        undefined,
        payload.isFetching
      );
    },
    removeChat: (state, { payload }: PayloadAction<{ chatId: string }>) => {
      const filteredChats = state.chats?.filter((c) => c.id !== payload.chatId);

      state.chats = filteredChats ?? null;
    },
  },
});

export const {
  addChat,
  addMsg,
  setChats,
  cacheFetchedMessages,
  setChatFetchStatus,
  removeChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;
