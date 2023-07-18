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

const tempMessages = `["When will we finally colonize Mars?", "I aim to see a thriving and self-sustaining colony on the Red Planet within the next 10 to 20 years, if all goes according to plan.", "Do you think we'll find any aliens?", "It's an exciting prospect, to say the least!"]`;
const tempImg =
  "https://cdn.discordapp.com/attachments/995431274267279440/1130295330865414164/PeaceKeeper4000_Dumbledore_on_a_dimly_lit_solid_color_backdrop__1fda31b0-ec0e-40cf-8af3-145a52bb08be.png";
const tempTitle = "Dumbledore";

export function ChatAnimation(props: ChatAnimation.Props) {
  const [messages, setMessages] = useState<ChatModel.IndexlessMessage[]>([]);
  const [personaImg, setPersonaImg] = useState(tempImg);
  const [title, setTitle] = useState(tempTitle);

  const messagesInput = useRef("");
  const msgRefs = useRef<(HTMLElement | null)[]>(
    Array(messages.length).fill(null)
  );
  const [msgsPxTranslate, setMsgsPxTranslate] = useState(-16);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [ready, setReady] = useState(false);

  const translateUp = useCallback(
    (msgIndex: number, currentTranslationPx: number) => {
      const ele = msgRefs.current?.[msgIndex];

      if (msgIndex > messages.length - 1 || !ele) {
        setTimeout(() => {
          setReady(false);
          setShowOverlay(false);
          setShowModal(true);
          setMsgsPxTranslate(-16);
        }, 3000);
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
      setShowOverlay(true);

      setTimeout(() => {
        setReady(true);
      }, 2500);

      setTimeout(() => {
        setShowOverlay(false);

        setTimeout(() => {
          translateUp(0, -16);
        }, 1250);
      }, 5000);
    }
  }, [messages, translateUp]);

  return (
    <ScrollablePage withFooter={false} className={styles.page}>
      <div
        className={classNames(
          styles.overlay,
          !showOverlay && styles.hide,
          ready && styles.ready
        )}
      >
        <div className={styles.imgWrapper}>
          <div className={styles.imgBg} />
          <div
            className={styles.img}
            style={{ backgroundImage: `url(${personaImg})` }}
          />
        </div>
        <p className={styles.title}>{title}</p>
      </div>

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
          messages: tempMessages,
          title: tempTitle,
          image: tempImg,
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
              const parsed: string[] = JSON.parse(tempMessages);
              // const parsed: string[] = JSON.parse(messagesInput.current);
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
            <InputField
              name="title"
              label="Title"
              onChange={(v) => setTitle(v)}
            />
            <InputField
              name="image"
              label="Image"
              onChange={(v) => setPersonaImg(v)}
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
