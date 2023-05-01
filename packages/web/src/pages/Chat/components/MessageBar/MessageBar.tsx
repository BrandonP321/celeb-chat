import React, { useRef, useState } from "react";
import styles from "../../Chat.module.scss";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { faPaperPlane } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "components/Button";
import { Formik, Field, Form } from "formik";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { validateMsg } from "@celeb-chat/shared/src/schema";
import Chat from "pages/Chat/Chat";
import { APIFetcher } from "utils/APIFetcher";
import { FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch, useChat } from "@/Hooks";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { Actions } from "@/Slices";

export namespace MessageBar {
  export type Props = {
    chat: ReturnType<typeof useChat>["chat"];
  };
}

export function MessageBar({ chat }: MessageBar.Props) {
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
      return;
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

  return (
    <div className={styles.stickyInputWrapper}>
      <Formik
        initialValues={{
          msgBody: "",
        }}
        onSubmit={sendMsg}
      >
        {({ values, submitForm }) => {
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
                  {(values.msgBody ?? "").length}/{ChatUtils.maxMsgCharCount}
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
  );
}