import React, { useState } from "react";
import styles from "./ChatDeletionConfirmationModal.module.scss";
import { Modal, SaveModal } from "@/Components";
import { useAppDispatch, useChats } from "@/Hooks";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { DeleteChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { useNavigate } from "react-router-dom";
import { WebChatUtils } from "utils/ChatUtils";

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
  const navigate = useNavigate();
  const { chats } = useChats();
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

        const chatIdFromUrl = WebChatUtils.getChatIdFromUrl();
        // nNavigate to first available chat if user is on page for deleted chat
        if (chatIdFromUrl === chatId) {
          const nextChatId = chats?.filter((c) => c.id !== chatId)[0]?.id;
          navigate(nextChatId ? `/chat/${nextChatId}` : "/chat/new");
        }
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
