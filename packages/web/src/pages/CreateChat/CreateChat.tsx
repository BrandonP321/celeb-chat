import React from "react";
import styles from "./CreateChat.module.scss";
import CreateChatForm from "./CreateChatForm";
import { AppHelmet, PageHeader, ScrollablePage } from "@/Components";
import { Loc } from "@/Loc";

namespace CreateChat {
  export type Props = {
    withCustomMsg?: boolean;
  };
}

function CreateChat({ withCustomMsg }: CreateChat.Props) {
  return (
    <ScrollablePage className={styles.createChat}>
      <AppHelmet title={Loc.Web.CreateChat.Meta.Title} />

      <PageHeader
        title={Loc.Web.CreateChat.Title}
        desc={Loc.Web.CreateChat.Desc}
      />
      <CreateChatForm showCustomMsgField={withCustomMsg} />
    </ScrollablePage>
  );
}

export default CreateChat;
