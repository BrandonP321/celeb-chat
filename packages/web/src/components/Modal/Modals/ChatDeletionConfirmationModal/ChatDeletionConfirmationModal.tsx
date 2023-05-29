import React, { useState } from "react";
import styles from "./ChatDeletionConfirmationModal.module.scss";
import { Modal, SaveModal, TextAccentSecondary } from "@/Components";
import { useAppDispatch, useChats } from "@/Hooks";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { DeleteChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { useNavigate } from "react-router-dom";
import { WebChatUtils } from "utils/ChatUtils";
import { Loc } from "@/Loc";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";

export namespace ChatDeletionConfirmationModal {
  export type Props = Modal.Props & {
    chat?: UserModel.UserChat;
    hideAllModals: () => void;
  };
}

export function ChatDeletionConfirmationModal({
  chat,
  hide,
  hideAllModals,
  ...rest
}: ChatDeletionConfirmationModal.Props) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { chats } = useChats();
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteChat = () => {
    if (!chat) {
      return;
    }

    setIsDeleting(true);

    APIFetcher.deleteChat({ chatId: chat.id })
      .then(() => {
        dispatch(
          Actions.Alert.addAlert({
            type: AlertType.Success,
            msg: Loc.Web.Chat.ChatDeleted,
          })
        );

        dispatch(Actions.Chat.removeChat({ chatId: chat.id }));

        const chatIdFromUrl = WebChatUtils.getChatIdFromUrl();
        // nNavigate to first available chat if user is on page for deleted chat
        if (chatIdFromUrl === chat?.id) {
          const nextChatId = chats?.filter((c) => c.id !== chat?.id)[0]?.id;
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
      title={Loc.Web.Chat.DeleteChatTitle}
      onSave={deleteChat}
      saveBtnText={Loc.Web.Chat.DeleteChatModalDelBtn}
      savingBtnText={Loc.Web.Chat.DeleteChatModalDeleting}
      saveBtnVariant="danger"
      cancelBtnVariant="primaryGradient"
      saving={isDeleting}
    >
      <p>
        {Loc.Web.Chat.DeleteBlurbPrefix}
        <TextAccentSecondary>{chat?.displayName}</TextAccentSecondary>
        {Loc.Web.Chat.DeleteBlurbSuffix}
      </p>
    </SaveModal>
  );
}
