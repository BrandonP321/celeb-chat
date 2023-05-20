import React, { useState } from "react";
import styles from "./StartChatForm.module.scss";
import { Form, Formik } from "formik";
import { FormikStringValues, FormikSubmit } from "utils/UtilityTypes";
import { Button, ButtonsWrapper, InputField } from "@/Components";
import { useNavigate } from "react-router-dom";
import { RouteHelper } from "@/Utils";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { Loc } from "@/Loc";

enum StartChatFormField {
  Recipient = "recipient",
}

export namespace StartChatForm {
  export type Values = FormikStringValues<StartChatFormField>;

  export type Props = {};
}

const initialValues: StartChatForm.Values = {
  [StartChatFormField.Recipient]: "",
};

export function StartChatForm(props: StartChatForm.Props) {
  const navigate = useNavigate();

  const [isNavigating, setIsNavigating] = useState(false);

  const handleSubmit: FormikSubmit<StartChatForm.Values> = async ({
    recipient,
  }) => {
    if (recipient) {
      setIsNavigating(true);
      navigate(RouteHelper.CreateChat({ description: recipient }));
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validateOnChange={false}
    >
      {({ dirty }) => (
        <Form className={styles.form} autoComplete="off">
          <h2 className={styles.formTitle}>{Loc.Web.Home.ChatForm.Title}</h2>
          <InputField
            classes={{ root: styles.input }}
            name={StartChatFormField.Recipient}
            placeholder={Loc.Web.Home.ChatForm.CharacterPlaceholder}
          />
          <ButtonsWrapper align={BtnAlign.Center}>
            <Button
              classes={{ root: styles.formBtn }}
              disabled={!dirty}
              loading={isNavigating}
              variant="primaryGradient"
            >
              {Loc.Web.Home.ChatForm.SubmitBtnText}
            </Button>
          </ButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
}
