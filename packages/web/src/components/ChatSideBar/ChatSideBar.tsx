import React, { useState } from "react";
import {
  ButtonLink,
  ChatCard,
  ChatCardOptionsModal,
  ChatDeletionConfirmationModal,
  LoadingContainer,
  StandaloneInputField,
} from "@/Components";
import styles from "./ChatSideBar.module.scss";
import classNames from "classnames";
import { useAppDispatch, useChats, useUser } from "@/Hooks";
import { useEffect } from "react";
import { Actions } from "@/Slices";
import { useRef } from "react";
import { APIFetcher } from "@/Utils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { Loc } from "@/Loc";

export namespace ChatSideBar {
  export type Props = {
    showInMobile: boolean;
    hideInMobile: () => void;
  };
}

function ChatSideBar({ showInMobile, hideInMobile }: ChatSideBar.Props) {
  const { chats } = useChats();
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [chatQuery, setChatQuery] = useState("");
  const [optionsModalChatId, setOptionsModalChatId] = useState<string>();
  const [deletionModalChatId, setDeletionModalChatId] = useState<string>();
  const [filteredChats, setFilteredChats] = useState<UserModel.UserChat[]>([]);
  const isFetchingChats = useRef(false);

  useEffect(() => {
    if (!chats && !isFetchingChats.current && !!user) {
      APIFetcher.getUserChats()
        .then(({ chats }) => {
          dispatch(Actions.Chat.setChats(chats));
        })
        .finally(() => (isFetchingChats.current = false));
    }
  }, [chats, dispatch, user]);

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

  useEffect(() => {
    hideInMobile();
  }, [location, hideInMobile]);

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
        <LoadingContainer
          loading={!chats}
          loadingText={Loc.Web.Chat.SideBar.LoadingChats}
        />

        <div className={styles.chatActions}>
          <StandaloneInputField
            name="ChatQuery"
            placeholder={Loc.Web.Chat.SideBar.SearchPlaceholder}
            onChange={(v) => setChatQuery(v)}
            classes={{ root: styles.searchBar, input: styles.input }}
            autoComplete="off"
          />
          <ButtonLink
            variant="primaryGradient"
            to="/chat/new"
            classes={{ root: styles.newChatLink }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className={styles.icon}
              onClick={hideInMobile}
            />
          </ButtonLink>
        </div>

        <div className={styles.chats}>
          {filteredChats?.map((chat, i) => (
            <ChatCard
              {...chat}
              key={i}
              onClick={hideInMobile}
              showOptionsModal={setOptionsModalChatId}
            />
          ))}
        </div>
      </div>

      <ChatCardOptionsModal
        show={!!optionsModalChatId}
        hide={() => setOptionsModalChatId(undefined)}
        chatId={optionsModalChatId ?? ""}
        showDeletionModal={() => setDeletionModalChatId(optionsModalChatId)}
      />

      <ChatDeletionConfirmationModal
        show={!!deletionModalChatId}
        hideAllModals={() => {
          setDeletionModalChatId(undefined);
          setOptionsModalChatId(undefined);
        }}
        hide={() => setDeletionModalChatId(undefined)}
        chatId={deletionModalChatId ?? ""}
      />
    </>
  );
}

export default ChatSideBar;
