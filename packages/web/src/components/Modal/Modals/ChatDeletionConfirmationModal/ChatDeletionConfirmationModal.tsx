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
import { Loc } from "@/Loc";

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
            msg: Loc.Web.Chat.ChatDeleted,
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
      title={Loc.Web.Chat.DeleteChatModalTitle}
      onSave={deleteChat}
      saveBtnText={Loc.Web.Chat.DeleteChatModalDelBtn}
      savingBtnText={Loc.Web.Chat.DeleteChatModalDeleting}
      saveBtnVariant="danger"
      cancelBtnVariant="primary"
      saving={isDeleting}
      classes={{ content: styles.modal }}
    >
      {Loc.Web.Chat.DeleteChatModalBlurb}
    </SaveModal>
  );
}
