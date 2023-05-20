import React from "react";
import styles from "./CreateChat.module.scss";
import CreateChatForm from "./CreateChatForm";
import { PageHeader, ScrollablePage } from "@/Components";
import { Loc } from "@/Loc";

namespace CreateChat {
  export type Props = {};
}

function CreateChat(props: CreateChat.Props) {
  return (
    <ScrollablePage className={styles.createChat}>
      <PageHeader
        title={Loc.Web.CreateChat.Title}
        desc={Loc.Web.CreateChat.Desc}
      />
      <CreateChatForm />
    </ScrollablePage>
  );
}

export default CreateChat;
