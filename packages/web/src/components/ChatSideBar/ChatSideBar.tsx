import React, { useState } from "react";
import {
  ChatCard,
  InputField,
  LoadingContainer,
  StandaloneInputField,
} from "@/Components";
import styles from "./ChatSideBar.module.scss";
import classNames from "classnames";
import { useAppDispatch, useChats } from "@/Hooks";
import { useEffect } from "react";
import { Actions } from "@/Slices";
import { useRef } from "react";
import { APIFetcher } from "utils/APIFetcher";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";

export namespace ChatSideBar {
  export type Props = {
    showInMobile: boolean;
    hideInMobile: () => void;
  };
}

function ChatSideBar({ showInMobile, hideInMobile }: ChatSideBar.Props) {
  const { chats } = useChats();
  const dispatch = useAppDispatch();

  const [chatQuery, setChatQuery] = useState("");
  const [filteredChats, setFilteredChats] = useState<UserModel.UserChat[]>([]);
  const isFetchingChats = useRef(false);

  useEffect(() => {
    if (!chats && !isFetchingChats.current) {
      APIFetcher.getUserChats()
        .then(({ chats }) => {
          dispatch(Actions.Chat.setChats(chats));
        })
        .finally(() => (isFetchingChats.current = false));
    }
  }, [chats, dispatch]);

  useEffect(() => {
    if (chats) {
      const queryRegex = new RegExp(chatQuery, "i");

      setFilteredChats(
        chats.filter((chat) => {
          return queryRegex.test(chat.displayName);
        })
      );
    }
  }, [chats, chatQuery]);

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

        <div className={styles.chatActions}>
          <StandaloneInputField
            name="ChatQuery"
            placeholder="Search for chat"
            onChange={(v) => setChatQuery(v)}
            classes={{ root: styles.searchBar }}
          />
          <Link to="/chat/new" className={styles.newChatLink}>
            <FontAwesomeIcon icon={faPlus} className={styles.icon} />
          </Link>
        </div>

        {filteredChats?.map((chat, i) => (
          <ChatCard {...chat} key={i} onClick={hideInMobile} />
        ))}
      </div>
    </>
  );
}

export default ChatSideBar;
