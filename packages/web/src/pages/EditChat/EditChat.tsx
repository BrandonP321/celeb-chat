import React, { useEffect, useState } from "react";
import styles from "./EditChat.module.scss";
import { EditChatForm } from "./components/EditChatForm";
import { LoadingContainer } from "@/Components";
import { GetChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { useLocation } from "react-router-dom";
import { WebChatUtils } from "utils/ChatUtils";
import { APIFetcher } from "utils/APIFetcher";

export namespace EditChat {
  export type Props = {};
}

export function EditChat(props: EditChat.Props) {
  const [chat, setChat] = useState<GetChatRequest.Response | null>(null);
  const location = useLocation();

  useEffect(() => {
    const chatId = WebChatUtils.getChatIdFromEditUrl();

    chatId && APIFetcher.getChat({ chatId }).then(setChat);
  }, [location]);

  return (
    <div className={styles.editChat}>
      <LoadingContainer loading={!chat} />
      <h1>Edit Chat</h1>
      {!!chat && <EditChatForm chat={chat} />}
    </div>
  );
}
