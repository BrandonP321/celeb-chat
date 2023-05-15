import React from "react";
import styles from "./CreateChat.module.scss";
import CreateChatForm from "./CreateChatForm";
import { PageHeader, ScrollablePage } from "@/Components";

namespace CreateChat {
  export type Props = {};
}

function CreateChat(props: CreateChat.Props) {
  return (
    <ScrollablePage className={styles.createChat}>
      <PageHeader
        title="Start a New Conversation"
        desc="Choose a character and customize their personality to begin an engaging chat experience. Let the fun begin!"
      />
      <CreateChatForm />
    </ScrollablePage>
  );
}

export default CreateChat;
