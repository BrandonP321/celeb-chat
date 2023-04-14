import { Button, ButtonsWrapper, InputField } from "@/Components";
import { CreateChatRequest } from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { CreateChatSchema } from "@celeb-chat/shared/src/schema";
import { AxiosError } from "axios";
import { Form, Formik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import { APIFetcher } from "utils/APIFetcher";
import { FormikStringValues, FormikSubmit } from "utils/UtilityTypes";

enum CreateChatField {
  DisplayName = "displayName",
  Description = "description",
}

namespace CreateChatForm {
  export type Values = FormikStringValues<CreateChatField>;
}

const createChatInitialValues: CreateChatForm.Values = {
  description: "",
  displayName: "",
};

export default function CreateChatForm() {
  const navigate = useNavigate();

  const handleSubmit: FormikSubmit<CreateChatForm.Values> = (
    values,
    formik
  ) => {
    const { description, displayName } = values;
    console.log("submit");

    return APIFetcher.createChat({ description, displayName })
      .then(({ data }) => {
        navigate(`/chat/${data?.id}`);
      })
      .catch((err: AxiosError<CreateChatRequest.Error>) => {
        console.log({ err });
        alert("oops");
      });
  };

  return (
    <Formik
      initialValues={createChatInitialValues}
      validationSchema={CreateChatSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({}) => (
        <Form>
          <InputField name={CreateChatField.DisplayName} label="Name" />
          <InputField name={CreateChatField.Description} label="Description" />

          <ButtonsWrapper>
            <Button>Create</Button>
          </ButtonsWrapper>
        </Form>
      )}
    </Formik>
  );
}
