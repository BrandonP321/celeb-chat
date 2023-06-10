import React from "react";
import styles from "./ChatNoMatch.module.scss";
import { Loc } from "@/Loc";
import { RouteHelper } from "utils/RouteHelper";
import { Link } from "react-router-dom";

export namespace ChatNoMatch {
  export type Props = {
    query?: string;
    onRedirect?: () => void;
  };
}

export function ChatNoMatch({ query, onRedirect }: ChatNoMatch.Props) {
  const createChatUrl = RouteHelper.CreateChat({ displayName: query });

  return (
    <div className={styles.noMatch}>
      <p className={styles.title}>{Loc.Web.Chat.NoChatsFound}</p>
      <Link className={styles.cta} to={createChatUrl} onClick={onRedirect}>
        {Loc.Web.Chat.NoChatCTAPrefix}
        {query}
      </Link>
    </div>
  );
}
