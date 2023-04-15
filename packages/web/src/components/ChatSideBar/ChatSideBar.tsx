import React from "react";
import { ChatCard, LoadingContainer } from "@/Components";
import styles from "./ChatSideBar.module.scss";
import classNames from "classnames";
import { useAppDispatch, useChats } from "@/Hooks";
import { useEffect } from "react";
import { Actions } from "@/Slices";
import { useRef } from "react";
import { APIFetcher } from "utils/APIFetcher";

export namespace ChatSideBar {
  export type Props = {
    showInMobile: boolean;
    hideInMobile: () => void;
  };
}

function ChatSideBar({ showInMobile, hideInMobile }: ChatSideBar.Props) {
  const { chats } = useChats();
  const dispatch = useAppDispatch();

  const isFetchingChats = useRef(false);

  useEffect(() => {
    if (!chats && !isFetchingChats.current) {
      APIFetcher.getUserChats()
        .then(({ data }) => {
          dispatch(Actions.Chat.setChats(data.chats));
        })
        .finally(() => (isFetchingChats.current = false));
    }
  }, [chats, dispatch]);

  return (
    <>
      <div
        className={classNames(
          styles.mobilePageOverlay,
          showInMobile && styles.show
        )}
        onClick={hideInMobile}
      />

      <div
        className={classNames(
          styles.chatBar,
          showInMobile && styles.showMobile
        )}
      >
        <LoadingContainer loading={!chats} loadingText="Loading chats" />
        {chats?.map((chat, i) => (
          <ChatCard {...chat} key={i} onClick={hideInMobile} />
        ))}
      </div>
    </>
  );
}

export default ChatSideBar;
