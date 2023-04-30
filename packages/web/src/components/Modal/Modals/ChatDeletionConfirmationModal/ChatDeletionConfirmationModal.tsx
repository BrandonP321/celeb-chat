import React, { useState } from "react";
import styles from "./ChatDeletionConfirmationModal.module.scss";
import { Modal, SaveModal } from "@/Components";
import { useAppDispatch } from "@/Hooks";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { DeleteChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";

export namespace ChatDeletionConfirmationModal {
  export type Props = Modal.Props & {
    chatId: string;
    hideAllModals: () => void;
  };
}

export function ChatDeletionConfirmationModal({
  chatId,
  hide,
  hideAllModals,
  ...rest
}: ChatDeletionConfirmationModal.Props) {
  const dispatch = useAppDispatch();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteChat = () => {
    setIsDeleting(true);

    APIFetcher.deleteChat({ chatId })
      .then(() => {
        dispatch(
          Actions.Alert.addAlert({
            type: AlertType.Success,
            msg: "Chat successfully deleted",
          })
        );

        dispatch(Actions.Chat.removeChat({ chatId }));
      })
      .catch((err: DeleteChatRequest.Error) => {
        dispatch(
          Actions.Alert.addAlert({ type: AlertType.Error, msg: err.msg })
        );
      })
      .finally(() => {
        setIsDeleting(false);
        hideAllModals();
      });
  };

  return (
    <SaveModal
      {...rest}
      hide={hide}
      title="Delete Chat"
      onSave={deleteChat}
      saveBtnText="Delete"
      savingBtnText="Deleting"
      saveBtnVariant="danger"
      cancelBtnVariant="primary"
      saving={isDeleting}
      classes={{ content: styles.modal }}
    >
      Are you sure you want to delete this chat?
    </SaveModal>
  );
}
