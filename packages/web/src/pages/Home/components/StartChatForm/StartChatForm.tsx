import React, { useState } from "react";
import styles from "./StartChatForm.module.scss";
import { Form, Formik } from "formik";
import { FormikStringValues, FormikSubmit } from "utils/UtilityTypes";
import { Button, ButtonsWrapper, InputField } from "@/Components";
import { useNavigate } from "react-router-dom";
import { RouteHelper } from "@/Utils";

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
        <Form className={styles.form}>
          <h2 className={styles.formTitle}>Who would you like to chat with?</h2>
          <InputField
            name={StartChatFormField.Recipient}
            placeholder="Some Person"
          />
          <ButtonsWrapper>
            <Button disabled={!dirty} loading={isNavigating}>
              Go
            </Button>
          </ButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
}
