import React, { useEffect, useState } from "react";
import styles from "./EditChat.module.scss";
import { EditChatForm } from "./components/EditChatForm";
import { LoadingContainer, PageHeader } from "@/Components";
import { GetChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { useLocation } from "react-router-dom";
import { WebChatUtils } from "utils/ChatUtils";
import { APIFetcher } from "utils/APIFetcher";
import { ChatNotFoundContent } from "pages/Chat/components/ChatNotFoundContent/ChatNotFoundContent";

export namespace EditChat {
  export type Props = {};
}

export function EditChat(props: EditChat.Props) {
  const [chat, setChat] = useState<GetChatRequest.Response | null>(null);
  const [chatNotFound, setChatNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const chatId = WebChatUtils.getChatIdFromEditUrl();
    setChatNotFound(false);

    chatId &&
      APIFetcher.getChat({ chatId })
        .then(setChat)
        .catch((err: GetChatRequest.Error) => {
          if (err.errCode === GetChatRequest.ErrorCode.ChatNotFound) {
            setChatNotFound(true);
          }
        });
  }, [location]);

  return (
    <div className={styles.editChat}>
      <LoadingContainer loading={!chat && !chatNotFound} />

      {chatNotFound && <ChatNotFoundContent />}

      <PageHeader
        title="Edit Your Chat"
        desc="Modify your character's settings and preferences to fine-tune your conversation experience. Make it truly unique!"
      />

      {!!chat && <EditChatForm chat={chat} />}
    </div>
  );
}
