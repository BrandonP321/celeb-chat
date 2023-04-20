import React from "react";
import styles from "./ChatCardOptionsModal.module.scss";
import { Button, ButtonsWrapper, Modal } from "@/Components";
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
  ...rest
}: ChatCardOptionsModal.Props) {
  return (
    <Modal {...rest} classes={{ content: styles.modal }}>
      <ButtonsWrapper align={BtnAlign.Top} className={styles.btns}>
        <Button classes={{ root: styles.btn }}>Edit Chat</Button>
        <Button classes={{ root: styles.btn }} onClick={showDeletionModal}>
          Delete Chat
        </Button>
      </ButtonsWrapper>
    </Modal>
  );
}
