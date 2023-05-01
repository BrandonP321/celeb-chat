import React, { useEffect, useState } from "react";
import styles from "./ChatCard.module.scss";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { WebChatUtils } from "utils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/pro-solid-svg-icons";

export namespace ChatCard {
  export type Props = UserModel.UserChat & {
    onClick?: () => void;
    showOptionsModal: (chatId: string) => void;
  };
}

function ChatCard(props: ChatCard.Props) {
  const { displayName, lastMessage, id, onClick, showOptionsModal } = props;

  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const activeChatId = WebChatUtils.getChatIdFromChatUrl();

    setIsSelected(activeChatId === id);
  }, [location, id]);

  return (
    <Link
      className={classNames(styles.chatCard, isSelected && styles.selected)}
      onClick={onClick}
      to={`/chat/${id}`}
    >
      <div className={styles.textWrapper}>
        <p className={styles.recipientName}>{displayName}</p>
        <p className={styles.lastMsg}>{lastMessage}</p>
      </div>

      <button
        className={styles.moreBtn}
        onClick={(e) => {
          e.preventDefault();
          showOptionsModal(id);
        }}
      >
        <FontAwesomeIcon icon={faEllipsis} className={styles.icon} />
      </button>
    </Link>
  );
}

export default ChatCard;
