import React from "react";
import styles from "../../RequestPasswordReset.module.scss";
import { APIFetcher } from "@/Utils";
import {
  ButtonsWrapper,
  FormWarningMsg,
  FormikFormWrapper,
  InputField,
  SubmitButton,
} from "@/Components";
import { Form } from "formik";
import { RequestPasswordResetSchema } from "@celeb-chat/shared/src/schema";
import { Loc } from "@/Loc";

enum Field {
  Email = "email",
}

export namespace RequestPasswordResetForm {
  export type Props = {};
}

export function RequestPasswordResetForm() {
  return (
    <FormikFormWrapper
      fields={Field}
      validationSchema={RequestPasswordResetSchema}
      defaultSubmitSuccessMsg={Loc.Web.RequestPassReset.Form.SuccessMsg}
      defaultOnSubmit={(v) =>
        APIFetcher.requestPasswordReset({ email: v[Field.Email] })
      }
    >
      <Form autoComplete="off">
        <InputField name={Field.Email} label={Loc.Common.Email} required />

        <FormWarningMsg>
          {Loc.Web.RequestPassReset.Form.WarningMsg}
        </FormWarningMsg>

        <ButtonsWrapper>
          <SubmitButton
            loadingText={Loc.Web.RequestPassReset.Form.SubmitBtnLoading}
          >
            {Loc.Web.RequestPassReset.Form.SubmitBtn}
          </SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikFormWrapper>
  );
}
