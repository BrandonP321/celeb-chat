import { TChat } from "@celeb-chat/shared/src/utils/ChatUtils";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { WebChatUtils } from "utils";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "./slices";
import type { AppDispatch, RootState } from "./store";

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

export const useUser = () => useAppSelector((state) => state.user);

export const useChats = () => useAppSelector((state) => state.chats);

/**
 * Returns the chat corresponding to the current URL,
 * fetching that chat if it hasn't been fetched yet
 */
export const useChat = () => {
  const location = useLocation();
  const { chatCache } = useChats();
  const dispatch = useAppDispatch();

  const [chatId, setChatId] = useState<string | undefined>();
  const [cachedChat, setCachedChat] = useState<Pick<TChat, "messages">>();
  const chatsBeingFetched = useRef<{ [chatId: string]: boolean }>({});

  useEffect(() => {
    const chatId = WebChatUtils.getChatIdFromChatUrl();
    setChatId(chatId);
    const cachedChat = chatCache[chatId ?? ""];

    setCachedChat(cachedChat);

    if (!cachedChat && chatId && !chatsBeingFetched.current[chatId]) {
      chatsBeingFetched.current[chatId] = true;

      APIFetcher.getChatMessages({ chatId }).then(({ data }) => {
        dispatch(
          Actions.Chat.cacheFetchedMessages({
            id: chatId,
            messages: data.messages,
          })
        );

        // TODO: Add error handling if fetch fails
        chatsBeingFetched.current[chatId] = false;
      });
    }
  }, [location, chatCache, dispatch]);

  return cachedChat && chatId
    ? { id: chatId, messages: cachedChat.messages }
    : undefined;
};
