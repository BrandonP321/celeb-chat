import React, { useEffect, useRef, useState } from "react";
import styles from "../../Chat.module.scss";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { faPaperPlane } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "components/Button";
import { Formik, Field, Form, useFormikContext } from "formik";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import { validateMsg } from "@celeb-chat/shared/src/schema";
import Chat from "pages/Chat/Chat";
import { APIFetcher } from "utils/APIFetcher";
import { FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch, useChat } from "@/Hooks";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";
import { Actions } from "@/Slices";
import { useLocation } from "react-router-dom";
import { Loc } from "@celeb-chat/shared/loc";

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

    const validationError = await validateMsg({ msgBody });

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
        {() => {
          return <MessageBarInnerForm pendingResponse={pendingResponse} />;
        }}
      </Formik>
    </div>
  );
}

namespace MessageBarInnerForm {
  export type Props = {
    pendingResponse: boolean;
  };
}

function MessageBarInnerForm(props: MessageBarInnerForm.Props) {
  const { pendingResponse } = props;

  const location = useLocation();
  const { values, submitForm, resetForm } = useFormikContext<{
    msgBody: string;
  }>();

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  const showCharCount =
    values.msgBody.length / ChatUtils.maxMsgCharCount >= 0.75;

  return (
    <Form className={styles.form} autoComplete="off">
      <div className={styles.formUpperContent}>
        <p
          className={classNames(
            styles.msgCharCount,
            showCharCount && styles.visible,
            values.msgBody.length >= ChatUtils.maxMsgCharCount && styles.max
          )}
        >
          {(values.msgBody ?? "").length}/{ChatUtils.maxMsgCharCount}
        </p>
      </div>

      <div className={styles.formLowerContent}>
        <div
          className={classNames(
            styles.inputWrapper,
            (isFocused || !!values.msgBody) && styles.focused
          )}
          data-replicated-value={values.msgBody}
        >
          <Field
            as="textarea"
            name="msgBody"
            className={styles.input}
            placeholder={Loc.Web.Chat.Message}
            maxLength={ChatUtils.maxMsgCharCount}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDownCapture={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
          variant="primaryGradient"
          type="submit"
        >
          <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
        </Button>
      </div>
    </Form>
  );
}
