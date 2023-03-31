import React from "react";
import { ChatCard } from "@/Components";
import { mockChats } from "data/mock/mockChats";
import styles from "./ChatSideBar.module.scss";
import classNames from "classnames";

export namespace ChatSideBar {
  export type Props = {
    showInMobile: boolean;
    hideInMobile: () => void;
  };
}

function ChatSideBar({ showInMobile, hideInMobile }: ChatSideBar.Props) {
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
        {mockChats.map((chat, i) => (
          <ChatCard {...chat} key={i} onClick={hideInMobile} />
        ))}
      </div>
    </>
  );
}

export default ChatSideBar;
