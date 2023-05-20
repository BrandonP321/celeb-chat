import React from "react";
import styles from "./ChatCardOptionsModal.module.scss";
import { Button, ButtonLink, ButtonsWrapper, Modal } from "@/Components";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { Loc } from "@/Loc";

export namespace ChatCardOptionsModal {
  export type Props = Modal.Props & {
    chatId: string;
    showDeletionModal: () => void;
  };
}

export function ChatCardOptionsModal({
  chatId,
  showDeletionModal,
  ...props
}: ChatCardOptionsModal.Props) {
  return (
    <Modal {...props} classes={{ content: styles.modal }}>
      <ButtonsWrapper align={BtnAlign.Top} className={styles.btns}>
        <ButtonLink
          classes={{ root: styles.btn }}
          to={`/chat/${chatId}/edit`}
          onClick={props.hide}
        >
          {Loc.Web.Chat.EditChat}
        </ButtonLink>
        <Button
          classes={{ root: styles.btn }}
          onClick={showDeletionModal}
          variant="danger"
        >
          {Loc.Web.Chat.DeleteChat}
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
}
