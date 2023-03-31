import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import {
  ChatCompletionRequestMessage,
  ChatCompletionResponseMessageRoleEnum,
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";
import styles from "./Chat.module.scss";
import { mockChats, TChat, TMessage } from "data/mock/mockChats";
import { ChatUtils } from "utils/ChatUtils";
import { useLocation } from "react-router-dom";

enum OpenAIModel {
  Davinci = "davinci",
  GPT3Turbo = "gpt-3.5-turbo",
}

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const model = OpenAIModel.GPT3Turbo;

const getTrainingMsg = (character: string) =>
  `For the rest of this conversation, you will be texting me while impersonating ${character}.  Specifically, you will also take on any stereotypical traits of ${character}.  Also, if ${character} has any specific speech patterns, attempt to mimic those speech patterns in your response.`;

const asyncFetchChat = (chatId: string, chatCache: Chat.ChatCache) => {
  return new Promise<TChat>((resolve, reject) => {
    const cachedChat = chatCache?.[chatId];

    if (cachedChat) {
      return resolve(cachedChat);
    }

    const response = mockChats.find((chat) => chat.id === chatId);
    // temp training message
    response?.messages?.unshift({
      content: getTrainingMsg(response.recipientDescription),
      role: "user",
    });

    if (response) {
      return resolve(response);
    } else {
      return reject("Chat does no exist");
    }
  });
};

namespace Chat {
  export type Props = {
    chatCache: React.MutableRefObject<ChatCache>;
  };

  export type ChatCache = {
    [key: string]: TChat;
  };
}

function Chat({ chatCache }: Chat.Props) {
  const chatIdRef = useRef<string | null>(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessagesState] = useState<TMessage[]>([]);
  const location = useLocation();

  useEffect(() => {
    const chatId = ChatUtils.getChatIdFromChatUrl();
    if (chatId) {
      chatIdRef.current = chatId;
      fetchChat(chatId);
    } else {
      alert("Unable to get chat id");
    }
  }, [location]);

  const fetchChat = (chatId: string) => {
    setLoading(true);

    if (!chatId) {
      alert("Unableto get chat ID");
      setLoading(false);
    } else {
      asyncFetchChat(chatId, chatCache.current)
        .then((res) => {
          setMessages(res, chatId);
        })
        .catch((errMsg) => {
          alert(errMsg);
        })
        .finally(() => setLoading(false));
    }
  };

  const getCachedChat = () => {
    return !!chatIdRef.current && chatCache.current?.[chatIdRef.current];
  };

  const setMessages = (data: TChat, chatId: string) => {
    setMessagesState(data.messages);
    chatCache.current = {
      ...chatCache.current,
      [chatId]: data,
    };
  };

  const sendMsg = (msg: string) => {
    const chatId = chatIdRef.current;
    const cachedChat = getCachedChat();

    if (!chatId || !cachedChat) {
      return;
    }

    setInput("");
    setLoading(true);

    cachedChat.messages.push(constructMsg(msg));

    setMessages(cachedChat, chatId);

    openai
      .createChatCompletion({
        model,
        messages: cachedChat.messages,
      })
      .then((res) => {
        const msgObj = res.data.choices[0].message;

        if (msgObj) {
          cachedChat.messages.push(msgObj);
          setMessages(cachedChat, chatId);
        } else {
          alert("error sending message, please refresh");
        }

        setLoading(false);
      })
      .catch((err) => {
        alert("error sending message, please refresh");
        setLoading(false);
      });
  };

  const constructMsg = (
    msg: string,
    role?: ChatCompletionResponseMessageRoleEnum
  ): ChatCompletionRequestMessage => ({
    content: msg,
    role: role || ChatCompletionRequestMessageRoleEnum.User,
  });

  return (
    <div className={styles.pageMain}>
      <div className={styles.scrollableContentWrapper}>
        <div className={styles.messages}>
          {messages.map(
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
