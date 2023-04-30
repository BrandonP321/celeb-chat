import React, { useRef, useState } from "react";
import classNames from "classnames";
import { ChatCompletionResponseMessageRoleEnum } from "openai";
import styles from "./Chat.module.scss";
import { useAppDispatch, useChat } from "@/Hooks";
import { Actions } from "@/Slices";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { APIFetcher } from "utils/APIFetcher";
import { Button, LoadingContainer, Spinner } from "@/Components";
import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { Field, Form, Formik } from "formik";
import { validateMsg } from "@celeb-chat/shared/src/schema";
import { FormikSubmit } from "utils/UtilityTypes";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/pro-solid-svg-icons";

namespace Chat {
  export type Props = {};

  export type MsgFormValues = {
    msgBody: string;
  };
}

function Chat(props: Chat.Props) {
  const chat = useChat();
  const dispatch = useAppDispatch();

  const [pendingResponse, setPendingResponseState] = useState(false);
  const pendingResponseRef = useRef(false);
  const setPendingResponse = (status: boolean) => {
    setPendingResponseState(status);
    pendingResponseRef.current = status;
  };

  const displayError = (err: string) => {
    dispatch(Actions.Alert.addAlert({ type: AlertType.Error, msg: err }));
  };

  const sendMsg: FormikSubmit<Chat.MsgFormValues> = async (
    { msgBody },
    formik
  ) => {
    if (!chat) {
      return displayError(DefaultErrors.Errors.NetworkError.msg);
    } else if (pendingResponseRef.current) {
      return displayError(
        `Wait until recipient has responded to send another message`
      );
    }

    const validationError = await validateMsg(msgBody);

    if (validationError) {
      return displayError(validationError);
    }

    formik.resetForm();
    setPendingResponse(true);

    dispatch(
      Actions.Chat.addMsg({
        message: ChatUtils.constructMsg(msgBody),
        chatId: chat.id,
      })
    );

    return APIFetcher.sendMsg({ chatId: chat.id, msgBody: msgBody })
      .then(({ newMsg }) => {
        dispatch(Actions.Chat.addMsg({ chatId: chat.id, message: newMsg }));
        dispatch(
          Actions.Chat.updateChat({ id: chat.id, lastMessage: newMsg.content })
        );
      })
      .catch((err: SendMsgRequest.Error) => {
        displayError(err.msg);
      })
      .finally(() => setPendingResponse(false));
  };

  const hasNoMessages = !chat?.messages?.length;

  return (
    <div className={styles.pageMain}>
      <LoadingContainer loading={!chat} loadingText="Loading messages" />
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

        <div className={styles.stickyInputWrapper}>
          <Formik
            initialValues={{
              msgBody: "",
            }}
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
                        className={styles.input}
                        placeholder={"Message"}
                        maxLength={ChatUtils.maxMsgCharCount}
                        onKeyDownCapture={(
                          e: React.KeyboardEvent<HTMLTextAreaElement>
                        ) => {
                          if (e.code === "Enter") {
                            e.preventDefault();
                            submitForm();
                          }
                        }}
                      />
                    </div>

                    <Button
                      classes={{ root: styles.sendBtn }}
                      disabled={pendingResponse || !values.msgBody}
                      loading={pendingResponse}
                      type="submit"
                    >
                      <FontAwesomeIcon
                        className={styles.icon}
                        icon={faPaperPlane}
                      />
                    </Button>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Chat;
