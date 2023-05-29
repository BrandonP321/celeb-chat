import React, { useEffect, useState } from "react";
import styles from "./EditChat.module.scss";
import { EditChatForm } from "./components/EditChatForm";
import { LoadingContainer, PageHeader, ScrollablePage } from "@/Components";
import { GetChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { useLocation } from "react-router-dom";
import { APIFetcher, WebChatUtils } from "@/Utils";
import { ChatNotFoundContent } from "pages/Chat/components/ChatNotFoundContent/ChatNotFoundContent";
import { Loc } from "@/Loc";

export namespace EditChat {
  export type Props = {};
}

export function EditChat(props: EditChat.Props) {
  const [chat, setChat] = useState<GetChatRequest.Response | null>(null);
  const [chatNotFound, setChatNotFound] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const chatId = WebChatUtils.getChatIdFromEditUrl();

    if (chatId === chat?.id) {
      return;
    }

    setChat(null);
    setChatNotFound(false);

    chatId &&
      APIFetcher.getChat({ chatId })
        .then(setChat)
        .catch((err: GetChatRequest.Error) => {
          if (err.errCode === GetChatRequest.ErrorCode.ChatNotFound) {
            setChatNotFound(true);
          }
        });
  }, [location, chat]);

  return (
    <ScrollablePage className={styles.editChat}>
      <LoadingContainer
        loading={!chat && !chatNotFound}
        loadingText={Loc.Web.EditChat.LoadingChats}
      />

      {chatNotFound && <ChatNotFoundContent />}

      <PageHeader
        title={Loc.Web.EditChat.PageTitle}
        desc={Loc.Web.EditChat.PageDesc}
      />

      {!!chat && <EditChatForm chat={chat} />}
    </ScrollablePage>
  );
}
