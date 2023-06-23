import React from "react";
import styles from "./ChatCardOptionsModal.module.scss";
import {
  ActionIcon,
  ActionIconLink,
  ButtonsWrapper,
  Modal,
  TextAccentSecondary,
  TextFaded,
} from "@/Components";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { Loc } from "@/Loc";
import { faEdit, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";

export namespace ChatCardOptionsModal {
  export type Props = Modal.Props & {
    chat?: UserModel.UserChat;
    showDeletionModal: () => void;
  };
}

export function ChatCardOptionsModal({
  chat,
  showDeletionModal,
  ...props
}: ChatCardOptionsModal.Props) {
  const title = (
    <>
      <TextFaded>{Loc.Web.Chat.ChatModalTitle}</TextFaded>
      <TextAccentSecondary>{chat?.displayName}</TextAccentSecondary>
    </>
  );

  return (
    <Modal {...props} title={title} classes={{ content: styles.modal }}>
      <ButtonsWrapper align={BtnAlign.Top} className={styles.btns}>
        <ActionIconLink
          icon={faEdit}
          to={`/chat/${chat?.id}/edit`}
          onClick={props.hide}
          classes={{ root: styles.btn, icon: styles.icon }}
          aria-label="Edit chat"
        />

        <ActionIcon
          icon={faTrash}
          variant="danger"
          onClick={showDeletionModal}
          classes={{ root: styles.btn, icon: styles.icon }}
          aria-label="Delete chat"
        />
      </ButtonsWrapper>
    </Modal>
  );
}
