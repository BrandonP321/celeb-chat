import React from "react";
import styles from "./ChatCardOptionsModal.module.scss";
import {
  ActionIcon,
  ActionIconLink,
  ButtonsWrapper,
  Modal,
} from "@/Components";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { Loc } from "@/Loc";
import { faEdit, faTrash } from "@fortawesome/pro-solid-svg-icons";

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
    <Modal
      {...props}
      title={Loc.Web.Chat.ChatModalTitle}
      classes={{ content: styles.modal }}
    >
      <ButtonsWrapper align={BtnAlign.Top} className={styles.btns}>
        <ActionIconLink
          icon={faEdit}
          to={`/chat/${chatId}/edit`}
          onClick={props.hide}
          classes={{ root: styles.btn, icon: styles.icon }}
        />

        <ActionIcon
          icon={faTrash}
          variant="danger"
          onClick={showDeletionModal}
          classes={{ root: styles.btn, icon: styles.icon }}
        />
      </ButtonsWrapper>
    </Modal>
  );
}
