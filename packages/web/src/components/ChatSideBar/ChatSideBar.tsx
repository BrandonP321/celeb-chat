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
import { UserActionsCard } from "./components/UserActionsCard/UserActionsCard";

export type ModalChatData = UserModel.UserChat & {
  show: boolean;
};

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
  const [optionsModalChat, setOptionsModalChat] = useState<ModalChatData>();
  const [deletionModalChat, setDeletionModalChat] = useState<ModalChatData>();
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

  const toggleOptionsModal = (show: boolean, chat?: UserModel.UserChat) => {
    const chatData = chat ?? optionsModalChat;

    chatData && setOptionsModalChat({ ...chatData, show });
  };

  const toggleDeletionModal = (show: boolean) => {
    const chatData = show ? optionsModalChat : deletionModalChat;

    chatData && setDeletionModalChat({ ...chatData, show });
  };

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
              showOptionsModal={(chat) => toggleOptionsModal(true, chat)}
            />
          ))}
        </div>

        <UserActionsCard />
      </div>

      <ChatCardOptionsModal
        show={!!optionsModalChat?.show}
        hide={() => toggleOptionsModal(false)}
        chat={optionsModalChat}
        showDeletionModal={() => toggleDeletionModal(true)}
      />

      <ChatDeletionConfirmationModal
        show={!!deletionModalChat?.show}
        hideAllModals={() => {
          toggleDeletionModal(false);
          toggleOptionsModal(false);
        }}
        hide={() => toggleDeletionModal(false)}
        chat={deletionModalChat}
      />
    </>
  );
}

export default ChatSideBar;
