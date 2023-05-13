import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useChat } from "@/Hooks";
import {
  LoadingContainer,
  MsgOptionsModal,
  PageHeader,
  Spinner,
} from "@/Components";
import { ChatNotFoundContent } from "./components/ChatNotFoundContent/ChatNotFoundContent";
import { MessageBar } from "./components/MessageBar/MessageBar";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import { BrowserUtils } from "@/Utils";
import { useLocation } from "react-router-dom";

namespace Chat {
  export type Props = {};

  export type MsgFormValues = {
    msgBody: string;
  };
}

function Chat(props: Chat.Props) {
  const location = useLocation();
  const { chat, isChatNotFound, isFetchingChat } = useChat({
    fetchIfNotExists: true,
  });

  const [showMsgOptionsModal, setShowMsgOptionsModal] = useState(false);
  const [selectedMsgIndex, setSelectedMsgIndex] = useState<number>();

  useEffect(() => {
    setSelectedMsgIndex(undefined);
  }, [location]);

  const openMessageOptions = (msgIndex: number) => {
    setShowMsgOptionsModal(true);
    setSelectedMsgIndex(msgIndex);
  };

  const hasNoMessages = !chat?.messages?.length;

  return (
    <div className={styles.pageMain}>
      <LoadingContainer
        loading={isFetchingChat}
        loadingText="Loading messages"
      />

      <MsgOptionsModal
        show={showMsgOptionsModal}
        msgIndex={selectedMsgIndex ?? 0}
        hide={() => setShowMsgOptionsModal(false)}
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
                {/* // TODO: Look into updating text */}
                {!chat?.isFetching && "Load more messages"}
              </button>
            )}

            {chat?.messages?.map((msg, i) => (
              <Message
                key={i}
                msg={msg}
                onClick={() => openMessageOptions(i)}
              />
            ))}
          </div>
        )}

        {hasNoMessages && (
          <PageHeader
            classes={{ root: styles.firstMsgNotice }}
            title="Get the conversation started"
            desc={`Send your first message to ${chat?.displayName} now.`}
          />
        )}

        <MessageBar chat={chat} />
      </div>
    </div>
  );
}

namespace Message {
  export type Props = {
    msg: ChatModel.IndexlessMessage;
    onClick: () => void;
  };
}

function Message({ msg, onClick }: Message.Props) {
  const maxTouchTimeToEngage = 500;
  const touchStart = useRef<number>();

  const onTouchStart = () => {
    touchStart.current = Date.now();
  };

  const onTouchEnd = () => {
    const touchEnd = Date.now();

    if (touchEnd - (touchStart.current ?? 0) <= maxTouchTimeToEngage) {
      onClick();
    }
  };

  const innerContent = (
    <>
      {!BrowserUtils.isTouchDevice && (
        <button className={styles.options} onClick={onClick}>
          {/* <FontAwesomeIcon */}
        </button>
      )}
      {msg.content}
    </>
  );

  const sharedProps: React.HTMLAttributes<HTMLElement> = {
    className: classNames(
      styles.msg,
      msg.role === ChatCompletionResponseMessageRoleEnum.User && styles.user
    ),
  };

  if (BrowserUtils.isTouchDevice) {
    return (
      <button {...sharedProps} onClick={onClick}>
        {innerContent}
      </button>
    );
  } else {
    return (
      <p {...sharedProps} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {innerContent}
      </p>
    );
  }
}

export default Chat;
