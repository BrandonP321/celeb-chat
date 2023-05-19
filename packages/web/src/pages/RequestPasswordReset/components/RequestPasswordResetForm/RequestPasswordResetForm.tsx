import React from "react";
import styles from "./RequestPasswordResetForm.module.scss";
import { APIFetcher } from "@/Utils";
import {
  ButtonsWrapper,
  FormikForm,
  InputField,
  SubmitButton,
} from "@/Components";
import { Form } from "formik";
import { RequestPasswordResetSchema } from "@celeb-chat/shared/src/schema";

enum Field {
  Email = "email",
}

export namespace RequestPasswordResetForm {
  export type Props = {};
}

export function RequestPasswordResetForm() {
  return (
    <FormikForm
      fields={Field}
      validationSchema={RequestPasswordResetSchema}
      defaultSubmitSuccessMsg="Password reset!"
      defaultOnSubmit={(v) =>
        APIFetcher.requestPasswordReset({ email: v[Field.Email] })
      }
    >
      <Form autoComplete="off">
        <InputField name={Field.Email} label="Email" />

        <ButtonsWrapper>
          <SubmitButton loadingText="Sending email">Send email</SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikForm>
  );
}
