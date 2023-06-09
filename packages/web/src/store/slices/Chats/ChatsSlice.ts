import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type MessagelessChat = Omit<TChat, "messages">;
export type CachedChat = {
  messages?: ChatModel.IndexlessMessage[];
  displayName: string;
  nextMarker?: number | null;
  isFetching: boolean;
};

export interface ChatsState {
  /** Map of chats that have had their messages fetched */
  chatCache: {
    [key: string]: CachedChat | undefined;
  };
  /** Ordered list of chats without messages, which are fetched when a chat is loaded */
  chats: UserModel.UserChat[] | null;
}

const initialState: ChatsState = {
  chatCache: {},
  chats: null,
};

// TODO: Refactor to use object parameter
/** Updates a cached chat, adding the chat to the cache if it doesn't already exist */
const updateCachedChat = (
  state: ChatsState,
  chatId: string,
  messages?: ChatModel.IndexlessMessage[],
  nextMarker?: number | null,
  isFetching?: boolean,
  displayName?: string
) => {
  const cachedChat = state.chatCache?.[chatId];

  state.chatCache = {
    ...state.chatCache,
    [chatId]: {
      messages: messages ?? cachedChat?.messages,
      nextMarker:
        nextMarker !== undefined ? nextMarker : cachedChat?.nextMarker,
      isFetching: isFetching ?? false,
      displayName: displayName ?? cachedChat?.displayName ?? "",
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
        Pick<TChat, "messages" | "id"> & {
          nextMarker: number | null;
          displayName: string;
        }
      >
    ) => {
      const cachedChat = state.chatCache?.[payload.id];

      updateCachedChat(
        state,
        payload.id,
        [...payload.messages, ...(cachedChat?.messages ?? [])],
        payload.nextMarker,
        false,
        payload.displayName
      );
    },
    addChat: (state, { payload }: PayloadAction<UserModel.UserChat>) => {
      state.chats = [payload, ...(state.chats ?? [])];

      updateCachedChat(state, payload.id, [], null, false, payload.displayName);
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
    updateChat: (
      state,
      {
        payload: chat,
      }: PayloadAction<
        Partial<Omit<UserModel.UserChat, "id">> & Pick<UserModel.UserChat, "id">
      >
    ) => {
      const updatedChats = state.chats?.map((c) => {
        if (c.id === chat.id) {
          return {
            ...c,
            ...chat,
          };
        }

        return c;
      });

      state.chats = updatedChats ?? null;
      updateCachedChat(
        state,
        chat?.id,
        undefined,
        undefined,
        undefined,
        chat.displayName
      );
    },
    removeChat: (state, { payload }: PayloadAction<{ chatId: string }>) => {
      const filteredChats = state.chats?.filter((c) => c.id !== payload.chatId);

      state.chats = filteredChats ?? null;
    },
  },
});

export const {
  updateChat,
  addChat,
  addMsg,
  setChats,
  cacheFetchedMessages,
  setChatFetchStatus,
  removeChat,
} = chatsSlice.actions;
export default chatsSlice.reducer;
