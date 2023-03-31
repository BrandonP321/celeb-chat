import React, { useEffect, useState } from "react";
import styles from "./ChatCard.module.scss";
import { TChat } from "data/mock/mockChats";
import { Link, matchPath, useLocation } from "react-router-dom";
import classNames from "classnames";

export namespace ChatCard {
  export type Props = TChat & {
    onClick?: () => void;
  };
}

function ChatCard(props: ChatCard.Props) {
  const {
    displayName,
    messages,
    recipientDescription,
    lastMessage,
    id,
    onClick,
  } = props;

  const [isSelected, setIsSelected] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const { params } =
      matchPath("/chat/:chatId", window.location.pathname) ?? {};

    setIsSelected(params?.chatId === id);
  }, [location, id]);

  return (
    <Link
      className={classNames(styles.chatCard, isSelected && styles.selected)}
      onClick={onClick}
      to={`/chat/${id}`}
    >
      <p className={styles.recipientName}>{displayName}</p>
      <p className={styles.lastMsg}>{lastMessage}</p>
    </Link>
  );
}

export default ChatCard;
