import React from "react";
import styles from "./CreateChat.module.scss";
import CreateChatForm from "./CreateChatForm";

namespace CreateChat {
  export type Props = {};
}

function CreateChat({}: CreateChat.Props) {
  return (
    <div className={styles.createChat}>
      <h1>Create Chat</h1>
      <CreateChatForm />
    </div>
  );
}

export default CreateChat;
