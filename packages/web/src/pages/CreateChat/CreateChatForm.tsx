import React from "react";
import { Button, ButtonsWrapper, InputField } from "@/Components";
import { CreateChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { CreateChatSchema } from "@celeb-chat/shared/src/schema";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { APIFetcher } from "utils/APIFetcher";
import { FormikStringValues, FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import { UrlUtils } from "@/Utils";
import { AlertType } from "@/Slices/Alerts/AlertsSlice";

export enum CreateChatField {
  DisplayName = "displayName",
  Description = "description",
}

namespace CreateChatForm {
  export type Values = FormikStringValues<CreateChatField>;
}

export default function CreateChatForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit: FormikSubmit<CreateChatForm.Values> = async (values) => {
    const { description, displayName } = values;

    return APIFetcher.createChat({ description, displayName })
      .then(({ id, displayName }) => {
        dispatch(Actions.Chat.addChat({ id, displayName }));
        navigate(`/chat/${id}`);
      })
      .catch((err: CreateChatRequest.Error) => {
        dispatch(
          Actions.Alert.addAlert({ type: AlertType.Error, msg: err.msg })
        );
      });
  };

  return (
    <Formik
      initialValues={{
        [CreateChatField.DisplayName]:
          UrlUtils.getParam(CreateChatField.DisplayName) ?? "",
        [CreateChatField.Description]:
          UrlUtils.getParam(CreateChatField.Description) ?? "",
      }}
      validationSchema={CreateChatSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          <InputField name={CreateChatField.DisplayName} label="Name" />
          <InputField name={CreateChatField.Description} label="Description" />

          <ButtonsWrapper>
            <Button variant="primaryGradient">Create</Button>
          </ButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
}
