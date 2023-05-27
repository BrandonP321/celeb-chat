import React from "react";
import styles from "../EditChat.module.scss";
import { FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch } from "@/Hooks";
import { Form } from "formik";
import { EditChatSchema } from "@celeb-chat/shared/src/schema";
import {
  ButtonsWrapper,
  EditChatHelpModal,
  FormikForm,
  HelpButton,
  InputField,
  SubmitButton,
} from "@/Components";
import { GetChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";
import { Loc } from "@/Loc";

enum EditChatField {
  DisplayName = "displayName",
  Description = "description",
}

export namespace EditChatForm {
  export type Props = {
    chat: GetChatRequest.Response;
  };
}

export function EditChatForm({ chat }: EditChatForm.Props) {
  const dispatch = useAppDispatch();

  const handleSubmit: FormikSubmit<{ [key in EditChatField]: string }> = async (
    values,
    formik
  ) => {
    return APIFetcher.updateChat({ chatId: chat.id, ...values }).then(() => {
      dispatch(Actions.Chat.updateChat({ id: chat.id, ...values }));
      formik.resetForm({ values });
    });
  };

  return (
    <FormikForm
      fields={EditChatField}
      initialValues={{
        [EditChatField.DisplayName]: chat.displayName,
        [EditChatField.Description]: chat.description ?? "",
      }}
      validationSchema={EditChatSchema}
      defaultSubmitSuccessMsg={Loc.Web.EditChat.ChatUpdateSuccess}
      defaultOnSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <InputField name={EditChatField.DisplayName} label={Loc.Common.Name} />
        <InputField name={EditChatField.Description} label={Loc.Common.Desc} />

        <p className={styles.warningMsg}>{Loc.Web.EditChat.WarningMsg}</p>

        <ButtonsWrapper>
          <HelpButton HelpModal={EditChatHelpModal} />
          <SubmitButton loadingText={Loc.Common.Saving}>
            {Loc.Common.Save}
          </SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikForm>
  );
}
