import React from "react";
import styles from "./PasswordResetForm.module.scss";
import { APIFetcher, FormikSubmit, RouteHelper, UrlUtils } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Form } from "formik";
import {
  ButtonsWrapper,
  FormikForm,
  InputField,
  SubmitButton,
} from "@/Components";
import { NewPasswordSchema } from "@celeb-chat/shared/src/schema/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";

enum PasswordResetField {
  Password = "password",
  PasswordConfirmation = "passwordConfirmation",
}

export namespace PasswordResetForm {
  export type Props = {};
}

export function PasswordResetForm(props: PasswordResetForm.Props) {
  const navigate = useNavigate();

  const handleSubmit: FormikSubmit<{
    [key in PasswordResetField]: string;
  }> = async ({ password, passwordConfirmation }) => {
    const confirmationId = UrlUtils.getParam("confirmationId");
    const confirmationHash = UrlUtils.getParam("confirmationHash");

    return APIFetcher.resetPassword({
      password,
      passwordConfirmation,
      confirmationId: confirmationId ?? "",
      confirmationHash: confirmationHash ?? "",
    }).then(() => {
      navigate(RouteHelper.Login());
    });
  };

  return (
    <FormikForm
      fields={PasswordResetField}
      defaultSubmitSuccessMsg="Password reset!"
      defaultOnSubmit={handleSubmit}
      validationSchema={NewPasswordSchema}
    >
      <Form autoComplete="off">
        <InputField
          name={PasswordResetField.Password}
          label="Password"
          type="password"
        />
        <InputField
          name={PasswordResetField.PasswordConfirmation}
          label="Confirm password"
          type="password"
        />

        <ButtonsWrapper>
          <SubmitButton loadingText="Resetting password">
            Reset password
          </SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikForm>
  );
}
