import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  ChatCompletionResponseMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import styles from "./Chat.module.scss";
import { TChat } from "data/mock/mockChats";
import { useAppDispatch, useChat } from "@/Hooks";
import { Actions } from "@/Slices";
import { ChatUtils } from "utils";

enum OpenAIModel {
  Davinci = "davinci",
  GPT3Turbo = "gpt-3.5-turbo",
}

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const model = OpenAIModel.GPT3Turbo;

const fetchChatCompletion = (chat: TChat, msgInput: string) => {
  const msg = ChatUtils.constructMsg(msgInput);

  return openai.createChatCompletion({
    model,
    messages: [...chat.messages, msg],
  });
};

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

    const message = ChatUtils.constructMsg(msgInput);

    fetchChatCompletion(chat, msgInput)
      .then(({ data }) => {
        const incomingMsg = data.choices[0].message;

        if (incomingMsg) {
          dispatch(Actions.Chat.addMsg({ chat, message: incomingMsg }));
        } else {
          console.log("Error parsing incoming message");
        }
      })
      .catch((err) => {
        console.log({ err });
      })
      .finally(() => setLoading(false));

    dispatch(
      Actions.Chat.addMsg({
        message,
        chat,
      })
    );
  };

  return (
    <div className={styles.pageMain}>
      <div className={styles.scrollableContentWrapper}>
        <div className={styles.messages}>
          {chat?.messages?.map(
            (msg, i) =>
              i !== 0 && (
                <p
                  key={i}
                  className={classNames(
                    msg.role === ChatCompletionResponseMessageRoleEnum.User &&
                      styles.user
                  )}
                >
                  {msg.content}
                </p>
              )
          )}
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
