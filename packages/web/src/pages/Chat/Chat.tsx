import React, { useRef, useState } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useChat } from "@/Hooks";
import { LoadingContainer, Spinner } from "@/Components";
import { ChatNotFoundContent } from "./components/ChatNotFoundContent/ChatNotFoundContent";
import { MessageBar } from "./components/MessageBar/MessageBar";

namespace Chat {
  export type Props = {};

  export type MsgFormValues = {
    msgBody: string;
  };
}

function Chat(props: Chat.Props) {
  const { chat, isChatNotFound, isFetchingChat } = useChat();

  const hasNoMessages = !chat?.messages?.length;

  return (
    <div className={styles.pageMain}>
      <LoadingContainer
        loading={isFetchingChat}
        loadingText="Loading messages"
      />

      {isChatNotFound && <ChatNotFoundContent />}

      <div
        className={classNames(
          styles.scrollableContentWrapper,
          hasNoMessages && styles.empty
        )}
      >
        {!hasNoMessages && (
          <div className={styles.messages}>
            {chat?.hasNextPage && (
              <button
                className={styles.loadMoreMsgs}
                onClick={chat?.fetchNextPage}
                disabled={chat?.isFetching}
              >
                {chat?.isFetching && (
                  <Spinner classes={{ root: styles.spinner }} />
                )}
                {!chat?.isFetching && "Load more messages"}
              </button>
            )}

            {chat?.messages?.map((msg, i) => (
              <p
                key={i}
                className={classNames(
                  msg.role === ChatCompletionResponseMessageRoleEnum.User &&
                    styles.user
                )}
              >
                {msg.content}
              </p>
            ))}
          </div>
        )}

        {hasNoMessages && (
          <div className={styles.firstMsgNotice}>
            <p>Send your first message</p>
          </div>
        )}

        <MessageBar chat={chat} />
      </div>
    </div>
  );
}

export default Chat;
