import React from "react";
import { ChatCard } from "@/Components";
import styles from "./ChatSideBar.module.scss";
import classNames from "classnames";
import { useAppDispatch, useChats } from "@/Hooks";
import { useEffect } from "react";
import { MessagelessChat } from "@/Slices/Chats/ChatsSlice";
import { mockChats } from "data/mock/mockChats";
import { Actions } from "@/Slices";
import { useRef } from "react";

const asyncFetchChats = () => {
  return new Promise<MessagelessChat[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(mockChats);
    }, 500);
  });
};

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
      asyncFetchChats()
        .then((chats) => {
          dispatch(Actions.Chat.setChats(chats));
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
        {chats?.map((chat, i) => (
          <ChatCard {...chat} key={i} onClick={hideInMobile} />
        ))}
      </div>
    </>
  );
}

export default ChatSideBar;
