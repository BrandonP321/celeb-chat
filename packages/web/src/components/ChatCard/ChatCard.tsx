import React, { useEffect, useState } from "react";
import styles from "./ChatCard.module.scss";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { MessagelessChat } from "@/Slices/Chats/ChatsSlice";
import { WebChatUtils } from "utils";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";

export namespace ChatCard {
  export type Props = UserModel.UserChat & {
    onClick?: () => void;
  };
}

function ChatCard(props: ChatCard.Props) {
  const { displayName, lastMessage, id, onClick } = props;

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
      <p className={styles.recipientName}>{displayName}</p>
      <p className={styles.lastMsg}>{lastMessage}</p>
    </Link>
  );
}

export default ChatCard;
