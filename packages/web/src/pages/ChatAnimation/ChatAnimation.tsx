import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./ChatAnimation.module.scss";
import { InputField, SaveModal, ScrollablePage } from "@/Components";
import { AnimationMsgBar } from "./components/AnimationMsgBar";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";
import classNames from "classnames";
import { Form, Formik } from "formik";

const msgBtnMargin = 20;
const timeToTextPerChar = 50;
const timeToReadPerChar = 10;
const responseWaitTime = 3000;
const delayBeforeTyping = 2000;
const delayBeforeSend = 500;

const getMsgTypeTime = (msg: string) => {
  return msg.length * timeToTextPerChar + delayBeforeSend;
};

const getMsgReadTime = (msg: string) => {
  return msg.length * timeToReadPerChar;
};

export namespace ChatAnimation {
  export type Props = {};
}

export function ChatAnimation(props: ChatAnimation.Props) {
  const [messages, setMessages] = useState<ChatModel.IndexlessMessage[]>([]);
  const messagesInput = useRef("");
  const msgRefs = useRef<(HTMLElement | null)[]>(
    Array(messages.length).fill(null)
  );
  const [msgsPxTranslate, setMsgsPxTranslate] = useState(-16);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const translateUp = useCallback(
    (msgIndex: number, currentTranslationPx: number) => {
      const ele = msgRefs.current?.[msgIndex];

      if (msgIndex > messages.length - 1 || !ele) {
        return;
      }

      const eleHeight = ele.getBoundingClientRect().height;
      const newTranslateAmnt = currentTranslationPx + eleHeight + msgBtnMargin;
      const msg = messages[msgIndex];

      const isUserMsg = msg.role === "user";

      isUserMsg && typeMessage(msg.content);
      setLoading(!isUserMsg);

      const translateDelay = isUserMsg
        ? getMsgTypeTime(msg.content)
        : responseWaitTime;

      const delayToNextMsg = isUserMsg
        ? getMsgReadTime(msg.content)
        : delayBeforeTyping;

      setTimeout(() => {
        setMsgsPxTranslate(newTranslateAmnt);
        setLoading(isUserMsg);

        setTimeout(() => {
          translateUp(msgIndex + 1, newTranslateAmnt);
        }, delayToNextMsg);
      }, translateDelay);
    },
    [messages]
  );

  const typeMessage = (msg: string) => {
    let input = "";
    let currentIndex = 0;

    const interval = setInterval(() => {
      input += msg[currentIndex];
      currentIndex++;

      setText(input);

      if (currentIndex >= msg.length) {
        clearInterval(interval);
        setTimeout(() => {
          setText("");
        }, delayBeforeSend);
      }
    }, timeToTextPerChar);
  };

  useEffect(() => {
    if (messages.length) {
      setTimeout(() => {
        translateUp(0, -16);
      }, 1000);
    }
  }, [messages, translateUp]);

  return (
    <ScrollablePage withFooter={false} className={styles.page}>
      <AnimationMsgBar text={text} timeToPrintText={500} loading={loading} />
      <div
        className={styles.messages}
        style={{ transform: `translateY(calc(100% - ${msgsPxTranslate}px))` }}
      >
        {messages.map((m, i) => (
          <Message
            msg={m}
            key={i}
            inputRef={(ref) => (msgRefs.current[i] = ref)}
          />
        ))}
      </div>
      <Formik
        initialValues={{
          messages: "",
        }}
        onSubmit={() => {}}
      >
        <SaveModal
          show={showModal}
          hide={() => setShowModal(false)}
          title="Provide messages"
          onSave={() => {
            setShowModal(false);
            try {
              const parsed: string[] = JSON.parse(messagesInput.current);
              setMessages(
                parsed.map((p, i) => ({
                  content: p,
                  role: i % 2 === 0 ? "user" : "assistant",
                }))
              );
            } catch (err) {
              alert(
                "Unable to parse messages.  Verify format and refresh page to start again."
              );
            }
          }}
        >
          <Form>
            <InputField
              name="messages"
              label="Messages"
              onChange={(v) => (messagesInput.current = v)}
            />
          </Form>
        </SaveModal>
      </Formik>
    </ScrollablePage>
  );
}

namespace Message {
  export type Props = {
    msg: ChatModel.IndexlessMessage;
    inputRef: (ele: HTMLElement | null) => void;
  };
}

function Message({ msg, inputRef }: Message.Props) {
  const sharedProps: React.HTMLAttributes<HTMLElement> = {
    className: classNames(styles.msg, msg.role === "user" && styles.user),
  };

  return (
    <p {...sharedProps} ref={(ele) => inputRef(ele)}>
      {msg.content}
    </p>
  );
}
