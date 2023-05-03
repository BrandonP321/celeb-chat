import React from "react";
import styles from "../EditChat.module.scss";
import { FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch } from "@/Hooks";
import { Form, Formik } from "formik";
import { EditChatSchema } from "@celeb-chat/shared/src/schema";
import { Button, ButtonsWrapper, InputField } from "@/Components";
import {
  GetChatRequest,
  UpdateChatRequest,
} from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { APIFetcher } from "utils/APIFetcher";
import { Actions } from "@/Slices";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";

enum EditChatField {
  DisplayName = "displayName",
}

export namespace EditChatForm {
  export type Values = UpdateChatRequest.UpdateFields;

  export type Props = {
    chat: GetChatRequest.Response;
  };
}

export function EditChatForm({ chat }: EditChatForm.Props) {
  const dispatch = useAppDispatch();

  const handleSubmit: FormikSubmit<EditChatForm.Values> = async (
    values,
    formik
  ) => {
    return APIFetcher.updateChat({ chatId: chat.id, ...values })
      .then(() => {
        dispatch(
          Actions.Alert.addAlert({
            type: AlertType.Success,
            msg: "Chat successfully updated",
          })
        );
        dispatch(Actions.Chat.updateChat({ id: chat.id, ...values }));
      })
      .catch((err: UpdateChatRequest.Error) => {
        dispatch(
          Actions.Alert.addAlert({ type: AlertType.Error, msg: err.msg })
        );
      });
  };

  return (
    <Formik
      initialValues={{
        [EditChatField.DisplayName]: chat.displayName,
      }}
      validationSchema={EditChatSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, dirty }) => {
        return (
          <Form autoComplete="off">
            <InputField name={EditChatField.DisplayName} label="Name" />

            <p className={styles.warningMsg}>
              Please note: Changing your character's settings may affect the way
              they respond in the conversation. Adjust with care to maintain a
              consistent chat experience.
            </p>

            <ButtonsWrapper>
              <Button
                type="submit"
                variant="primaryGradient"
                loading={isSubmitting}
                loadingText="Saving"
                disabled={!dirty}
              >
                Save
              </Button>
            </ButtonsWrapper>
          </Form>
        );
      }}
    </Formik>
  );
}
