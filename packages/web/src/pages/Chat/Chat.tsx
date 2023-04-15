import React, { useState } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useAppDispatch, useChat } from "@/Hooks";
import { Actions } from "@/Slices";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { APIFetcher } from "utils/APIFetcher";
import { LoadingContainer } from "@/Components";

namespace Chat {
  export type Props = {};
}

function Chat(props: Chat.Props) {
  const chat = useChat();
  const dispatch = useAppDispatch();

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMsg = (msgInput: string) => {
    if (!chat) {
      return;
    }

    setInput("");
    setLoading(true);

    dispatch(
      Actions.Chat.addMsg({
        message: ChatUtils.constructMsg(msgInput),
        chatId: chat.id,
      })
    );

    APIFetcher.sendMsg({ chatId: chat.id, msgBody: msgInput })
      .then(({ data }) => {
        const incomingMsg = data.newMsg;

        dispatch(
          Actions.Chat.addMsg({ chatId: chat.id, message: incomingMsg })
        );
      })
      .catch((err) => {
        alert("Oops");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className={styles.pageMain}>
      <LoadingContainer loading={!chat} loadingText="Loading messages" />
      <div className={styles.scrollableContentWrapper}>
        <div className={styles.messages}>
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

        <div className={styles.stickyInputWrapper}>
          <form className={styles.form}>
            <div className={styles.inputWrapper} data-replicated-value={input}>
              <textarea
                value={input}
                className={styles.input}
                placeholder={"Message"}
                onChange={(e) => setInput(e.currentTarget.value)}
                onKeyDownCapture={(e) => {
                  if (e.code === "Enter") {
                    e.preventDefault();
                    sendMsg(input);
                  }
                }}
              />
            </div>

            <button
              className={styles.sendBtn}
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                sendMsg(input);
              }}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Chat;
