import React from "react";
import styles from "./ChatNotFoundContent.module.scss";
import { Loc } from "@/Loc";
import {
  ButtonLink,
  ButtonsWrapper,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { RouteHelper } from "utils/RouteHelper";

export namespace ChatNotFoundContent {
  export type Props = {};
}

export function ChatNotFoundContent(props: ChatNotFoundContent.Props) {
  return (
    <div className={styles.notFound}>
      <ScrollablePage className={styles.innerContent}>
        <PageHeader
          classes={{ root: styles.content, desc: styles.desc }}
          title={Loc.Web.Chat.ChatNotFound}
          desc={Loc.Web.Chat.ChatNotFoundDesc}
        />
        <ButtonsWrapper className={styles.cta}>
          <ButtonLink to={RouteHelper.CreateChat()}>
            Start a New Chat
          </ButtonLink>
        </ButtonsWrapper>
      </ScrollablePage>
    </div>
  );
}
