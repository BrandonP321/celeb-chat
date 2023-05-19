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

enum EditChatField {
  DisplayName = "displayName",
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
      }}
      validationSchema={EditChatSchema}
      defaultSubmitSuccessMsg="Chat successfully updated"
      defaultOnSubmit={handleSubmit}
    >
      <Form autoComplete="off">
        <InputField name={EditChatField.DisplayName} label="Name" />

        <p className={styles.warningMsg}>
          Please note: Changing your character's settings may affect the way
          they respond in the conversation. Adjust with care to maintain a
          consistent chat experience.
        </p>

        <ButtonsWrapper>
          <HelpButton HelpModal={EditChatHelpModal} />
          <SubmitButton loadingText="Saving">Save</SubmitButton>
        </ButtonsWrapper>
      </Form>
    </FormikForm>
  );
}
