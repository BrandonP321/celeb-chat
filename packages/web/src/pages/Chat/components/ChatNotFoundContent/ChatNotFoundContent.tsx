import React from "react";
import styles from "./ChatNotFoundContent.module.scss";
import { Loc } from "@/Loc";

export namespace ChatNotFoundContent {
  export type Props = {};
}

export function ChatNotFoundContent(props: ChatNotFoundContent.Props) {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h2>{Loc.Web.Chat.ChatNotFound}</h2>
      </div>
    </div>
  );
}
