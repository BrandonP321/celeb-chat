import React, { useEffect, useRef, useState } from "react";
import styles from "./AnimationMsgBar.module.scss";
import { ChatUtils } from "@celeb-chat/shared/src/utils/ChatUtils";
import { faPaperPlane } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { Button } from "components/Button";
import { Formik, Field, Form, useFormikContext } from "formik";
import { useUser } from "@/Hooks";
import { useLocation } from "react-router-dom";
import { Loc } from "@celeb-chat/shared/loc";

export namespace AnimationMsgBar {
  export type Props = {
    loading: boolean;
    text: string;
    timeToPrintText: number;
  };
}

export function AnimationMsgBar(props: AnimationMsgBar.Props) {
  const handleSubmit = () => {};

  return (
    <div className={styles.stickyInputWrapper}>
      <Formik
        initialValues={{
          msgBody: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => {
          return <MessageBarInnerForm {...props} />;
        }}
      </Formik>
    </div>
  );
}

namespace MessageBarInnerForm {
  export type Props = AnimationMsgBar.Props & {};
}

function MessageBarInnerForm(props: MessageBarInnerForm.Props) {
  const { loading, text } = props;

  const location = useLocation();
  const { submitForm, resetForm } = useFormikContext<{
    msgBody: string;
  }>();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    resetForm();
  }, [location, resetForm]);

  return (
    <Form className={styles.form} autoComplete="off">
      <div className={styles.formLowerContent}>
        <div
          className={classNames(
            styles.inputWrapper,
            (isFocused || !!text) && styles.focused
          )}
          data-replicated-value={text}
        >
          <Field
            as="textarea"
            name="msgBody"
            className={styles.input}
            placeholder={Loc.Web.Chat.Message}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            value={text}
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
          disabled={loading || !text}
          loading={loading}
          variant="primaryGradient"
          type="submit"
          aria-label="Send message"
        >
          <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
        </Button>
      </div>
    </Form>
  );
}
