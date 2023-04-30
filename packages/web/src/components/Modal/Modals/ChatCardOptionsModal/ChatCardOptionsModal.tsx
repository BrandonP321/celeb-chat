import React from "react";
import styles from "./ChatCardOptionsModal.module.scss";
import { Button, ButtonLink, ButtonsWrapper, Modal } from "@/Components";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";

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
          Edit Chat
        </ButtonLink>
        <Button
          classes={{ root: styles.btn }}
          onClick={showDeletionModal}
          variant="danger"
        >
          Delete Chat
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
}
