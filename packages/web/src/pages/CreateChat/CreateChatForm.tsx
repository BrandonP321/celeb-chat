import React, { useEffect } from "react";
import {
  ButtonsWrapper,
  CreateChatHelpModal,
  FormikForm,
  FormikFormWrapper,
  HelpButton,
  InputField,
  SubmitButton,
} from "@/Components";
import { CreateChatSchema } from "@celeb-chat/shared/src/schema";
import { useLocation, useNavigate } from "react-router-dom";
import { APIFetcher } from "utils/APIFetcher";
import { FormikStringValues, FormikSubmit } from "utils/UtilityTypes";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import { UrlUtils } from "@/Utils";
import { Loc } from "@/Loc";

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

    return APIFetcher.createChat({ description, displayName }).then(
      ({ id, displayName }) => {
        dispatch(Actions.Chat.addChat({ id, displayName }));
        navigate(`/chat/${id}`);
      }
    );
  };

  const initialValues = {
    [CreateChatField.DisplayName]:
      UrlUtils.getParam(CreateChatField.DisplayName) ?? "",
    [CreateChatField.Description]:
      UrlUtils.getParam(CreateChatField.Description) ?? "",
  };

  return (
    <FormikFormWrapper
      fields={CreateChatField}
      initialValues={initialValues}
      validationSchema={CreateChatSchema}
      defaultOnSubmit={handleSubmit}
    >
      <FormikForm
        autoComplete="off"
        resetOnPageLoadProps={{ values: initialValues }}
      >
        <InputField
          name={CreateChatField.DisplayName}
          label={Loc.Common.Name}
          hintText={Loc.Web.CreateChat.NameHintText}
          required
        />
        <InputField
          name={CreateChatField.Description}
          label={Loc.Common.Desc}
          hintText={Loc.Web.CreateChat.DescHintText}
        />

        <ButtonsWrapper>
          <HelpButton HelpModal={CreateChatHelpModal} />
          <SubmitButton
            loadingText={Loc.Common.Creating}
            disabledWhenDirty={false}
          >
            {Loc.Common.Create}
          </SubmitButton>
        </ButtonsWrapper>
      </FormikForm>
    </FormikFormWrapper>
  );
}
