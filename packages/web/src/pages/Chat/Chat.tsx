import React, { useRef } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useAppDispatch, useChat } from "@/Hooks";
import { Actions } from "@/Slices";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { APIFetcher } from "utils/APIFetcher";
import { LoadingContainer, Spinner } from "@/Components";
import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { Field, Form, Formik } from "formik";
import { SendMsgSchema } from "@celeb-chat/shared/src/schema";
import { FormikSubmit } from "utils/UtilityTypes";

namespace Chat {
  export type Props = {};

  export type MsgFormValues = {
    msgBody: string;
  };
}

function Chat(props: Chat.Props) {
  const chat = useChat();
  const dispatch = useAppDispatch();

  const isWaitingForResponse = useRef(false);

  const sendMsg: FormikSubmit<Chat.MsgFormValues> = async (
    { msgBody },
    formik
  ) => {
    if (!chat || isWaitingForResponse.current) {
      return;
    }

    isWaitingForResponse.current = true;

    dispatch(
      Actions.Chat.addMsg({
        message: ChatUtils.constructMsg(msgBody),
        chatId: chat.id,
      })
    );

    return APIFetcher.sendMsg({ chatId: chat.id, msgBody: msgBody })
      .then(({ newMsg }) => {
        dispatch(Actions.Chat.addMsg({ chatId: chat.id, message: newMsg }));
      })
      .catch((err: SendMsgRequest.Error) => {
        // TODO: Display error message in toast
        console.log({ err });
      })
      .finally(() => (isWaitingForResponse.current = false));
  };

  return (
    <div className={styles.pageMain}>
      <LoadingContainer loading={!chat} loadingText="Loading messages" />
      <div className={styles.scrollableContentWrapper}>
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

        <div className={styles.stickyInputWrapper}>
          <Formik
            initialValues={{
              msgBody: "",
            }}
            validationSchema={SendMsgSchema}
            validateOnChange={false}
            onSubmit={sendMsg}
          >
            {({ values, errors, submitForm, isSubmitting }) => {
              return (
                <Form className={styles.form}>
                  <div className={styles.formUpperContent}>
                    <p
                      className={classNames(
                        styles.msgCharCount,
                        values.msgBody.length >= ChatUtils.maxMsgCharCount &&
                          styles.max
                      )}
                    >
                      {(values.msgBody ?? "").length}/
                      {ChatUtils.maxMsgCharCount}
                    </p>
                  </div>

                  <div className={styles.formLowerContent}>
                    <div
                      className={styles.inputWrapper}
                      data-replicated-value={values.msgBody}
                    >
                      <Field
                        as="textarea"
                        name="msgBody"
                        // value={input}
                        className={styles.input}
                        placeholder={"Message"}
                        // onChangeCapture={(
                        //   e: React.ChangeEvent<HTMLInputElement>
                        // ) => setInput(e.currentTarget.value)}
                        maxLength={ChatUtils.maxMsgCharCount}
                        onKeyDownCapture={(
                          e: React.KeyboardEvent<HTMLTextAreaElement>
                        ) => {
                          if (e.code === "Enter") {
                            e.preventDefault();
                            // sendMsg(input);
                            submitForm();
                          }
                        }}
                      />
                    </div>

                    <button
                      className={styles.sendBtn}
                      disabled={isSubmitting}
                      type="submit"
                      // onClick={(e) => {
                      //   e.preventDefault();
                      //   sendMsg(input);
                      // }}
                    >
                      Send
                    </button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
        {/* <div className={styles.stickyInputWrapper}>
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
        </div> */}
      </div>
    </div>
  );
}

export default Chat;
