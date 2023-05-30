import React from "react";
import styles from "./PasswordResetForm.module.scss";
import { APIFetcher, FormikSubmit, RouteHelper, UrlUtils } from "@/Utils";
import { Form } from "formik";
import {
  ButtonsWrapper,
  FormWarningMsg,
  FormikFormWrapper,
  InputField,
  SubmitButton,
} from "@/Components";
import { NewPasswordSchema } from "@celeb-chat/shared/src/schema/ResetPasswordSchema";
import { useNavigate } from "react-router-dom";
import { Loc } from "@/Loc";

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
    <FormikFormWrapper
      fields={PasswordResetField}
      defaultSubmitSuccessMsg={Loc.Web.PassReset.Form.successMsg}
      defaultOnSubmit={handleSubmit}
      validationSchema={NewPasswordSchema}
    >
      <Form autoComplete="off">
        <InputField
          name={PasswordResetField.Password}
          label={Loc.Common.Password}
          type="password"
        />
        <InputField
          name={PasswordResetField.PasswordConfirmation}
          label={Loc.Common.ConfirmPassword}
          type="password"
        />

        <FormWarningMsg>{Loc.Web.PassReset.Form.WarningMsg}</FormWarningMsg>

        <ButtonsWrapper>
          <SubmitButton loadingText={Loc.Web.PassReset.Form.SubmitBtnLoading}>
            {Loc.Web.PassReset.Form.SubmitBtn}
          </SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikFormWrapper>
  );
}
