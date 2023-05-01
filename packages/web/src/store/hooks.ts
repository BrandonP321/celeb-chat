import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WebChatUtils } from "utils";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "./slices";
import type { AppDispatch, RootState } from "./store";
import { GetChatMessagesRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { CachedChat } from "./slices/Chats/ChatsSlice";

// export appropriately typed `useDispatch` and `useAppSelector` hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * Responsive hook that returns the current status of each css breakpoint
 * @param breakpoint optional breakpoint string for returning only a single boolean value for that breakpoint
 * @returns object of booleans for each breakpoint if no breakpoint parameter is specified, otherwise returns a boolean for the specified breakpoint
 */
export const useResponsive = () => useAppSelector((state) => state.responsive);

export const usePageLoading = () =>
  useAppSelector((state) => state.pageLoading.loading);

export const useAlerts = () => useAppSelector((state) => state.alerts);

export const useAlert = (index: number) => {
  const { alerts } = useAlerts();

  return alerts[index];
};

export const useUser = () => useAppSelector((state) => state.user);

export const useChats = () => useAppSelector((state) => state.chats);

type UseChatProps = {
  fetchIfNotExists?: boolean;
};

/**
 * Returns the chat corresponding to the current URL,
 * fetching that chat if it hasn't been fetched yet
 */
export const useChat = ({ fetchIfNotExists }: UseChatProps = {}) => {
  const location = useLocation();
  const { chatCache, chats } = useChats();
  const dispatch = useAppDispatch();

  const [chatId, setChatIdState] = useState<string | undefined>();
  const chatIdRef = useRef<string | undefined>();
  const setChatId = (id: string | undefined) => {
    chatIdRef.current = id;
    setChatIdState(id);
  };

  const [isChatNotFound, setIsChatNotFound] = useState(false);
  const [cachedChat, setCachedChat] = useState<CachedChat>();

  // TODO: store this data in store
  const chatsBeingFetched = useRef<{ [chatId: string]: boolean }>({});

  useEffect(() => {
    const chatId = WebChatUtils.getChatIdFromUrl();
    setChatId(chatId);
    const cachedChat = chatCache[chatId ?? ""];

    setCachedChat(cachedChat);

    if (
      !cachedChat &&
      chatId &&
      !chatsBeingFetched.current[chatId] &&
      fetchIfNotExists
    ) {
      setIsChatNotFound(false);
      chatsBeingFetched.current[chatId] = true;

      fetchNextPage(true);
    }
  }, [location, chatCache, dispatch]);

  const fetchNextPage = (isFirstFetch?: boolean) => {
    const { nextMarker } = cachedChat ?? {};
    const chatId = chatIdRef.current;

    if (chatId && (isFirstFetch || nextMarker !== null)) {
      dispatch(Actions.Chat.setChatFetchStatus({ chatId, isFetching: true }));

      APIFetcher.getChatMessages({ chatId, marker: nextMarker })
        .then(({ messages, nextPageMarker, displayName }) => {
          dispatch(
            Actions.Chat.cacheFetchedMessages({
              id: chatId,
              messages: messages,
              nextMarker: nextPageMarker,
              displayName,
            })
          );

          // TODO: Add error handling if fetch fails
          chatsBeingFetched.current[chatId] = false;
        })
        .catch((err: GetChatMessagesRequest.Error) => {
          if (err.errCode === GetChatMessagesRequest.ErrorCode.ChatNotFound) {
            setIsChatNotFound(true);
          }
        });
    }
  };

  console.log(chats?.find((c) => c.id === chatId)?.displayName);

  return {
    chat:
      cachedChat && chatId
        ? {
            id: chatId,
            messages: cachedChat.messages,
            nextMarker: cachedChat.nextMarker,
            hasNextPage: cachedChat.nextMarker !== null,
            isFetching: cachedChat.isFetching,
            displayName: cachedChat.displayName,
            fetchNextPage: () => fetchNextPage(),
          }
        : undefined,
    isChatNotFound,
    isFetchingChat:
      cachedChat?.isFetching && !cachedChat?.messages.length && !isChatNotFound,
    displayName:
      cachedChat?.displayName ??
      chats?.find((c) => c.id === chatId)?.displayName,
  };
};
