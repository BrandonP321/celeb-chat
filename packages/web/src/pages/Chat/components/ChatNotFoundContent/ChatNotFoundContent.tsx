import React from "react";
import styles from "./ChatNotFoundContent.module.scss";

export namespace ChatNotFoundContent {
  export type Props = {};
}

// TODO: Update this UX & copy
export function ChatNotFoundContent(props: ChatNotFoundContent.Props) {
  return (
    <div className={styles.notFound}>
      <div className={styles.content}>
        <h2>Chat Not Found</h2>
      </div>
    </div>
  );
}
