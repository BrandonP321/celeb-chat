import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useChat } from "@/Hooks";
import {
  AppHelmet,
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
import { Loc } from "@/Loc";

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
      <AppHelmet title={Loc.Web.Chat.Meta.Title(chat?.displayName)} />

      <LoadingContainer
        loading={isFetchingChat}
        loadingText={Loc.Web.Chat.LoadingMsgs}
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

                {!chat?.isFetching && Loc.Web.Chat.LoadMoreMsg}
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
            classes={{ root: styles.firstMsgNotice, desc: styles.desc }}
            title={Loc.Web.Chat.EmptyChatTitle}
            desc={Loc.Web.Chat.EmptyChatDesc(chat?.displayName ?? "")}
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

  // TODO: User this code when we want to add in message sharing
  // if (BrowserUtils.isTouchDevice) {
  //   return (
  //     <button {...sharedProps} onClick={onClick}>
  //       {innerContent}
  //     </button>
  //   );
  // } else {
  //   return (
  //     <p {...sharedProps} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
  //       {innerContent}
  //     </p>
  //   );
  // }

  return <p {...sharedProps}>{msg.content}</p>;
}

export default Chat;
