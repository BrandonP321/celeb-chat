import React, { useState } from "react";
import { Form } from "formik";
import {
  GetUserRequest,
  UpdateUserRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import {
  Button,
  ButtonsWrapper,
  EmailInputField,
  FieldName,
  FormikFormWrapper,
  SubmitButton,
  UsernameInputField,
} from "@/Components";
import { EditUserSchema } from "@celeb-chat/shared/src/schema";
import { Loc } from "@/Loc";
import { APIFetcher, FormikSubmit } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import styles from "../../UserDashboard.module.scss";

enum EditUserField {
  Email = FieldName.Email,
  Username = FieldName.Username,
}

export namespace EditUserForm {
  export type Props = {
    user: GetUserRequest.Response | null;
  };
}

export function EditUserForm({ user }: EditUserForm.Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setAPIError] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSubmit: FormikSubmit<{
    [key in EditUserField]: string;
  }> = (values, formik) => {
    setAPIError(undefined);

    return APIFetcher.updateUser(values)
      .then(() => {
        dispatch(Actions.User.updateUser(values));
        dispatch(
          Actions.Alert.addSuccessAlert({ msg: Loc.Web.UserDash.UpdateSuccess })
        );
        formik.resetForm({ values });
        setIsEditing(false);
      })
      .catch((err: UpdateUserRequest.Error) => {
        setAPIError(err.msg);
      });
  };

  return (
    <FormikFormWrapper
      fields={EditUserField}
      validationSchema={EditUserSchema}
      initialValues={{
        [EditUserField.Email]: user?.email ?? "",
        [EditUserField.Username]: user?.username ?? "",
      }}
      onSubmit={handleSubmit}
    >
      {({ resetForm }) => (
        <Form autoComplete="off">
          <EmailInputField
            disabled={user?.isEmailVerified || !isEditing}
            hintText={Loc.Web.UserDash.EmailHint}
          />
          <UsernameInputField disabled={!isEditing} />

          {apiError && <p className={styles.errorMsg}>{apiError}</p>}

          <ButtonsWrapper>
            <Button
              variant={isEditing ? "danger" : "primaryGradient"}
              onClick={() => {
                resetForm();
                setAPIError(undefined);
                setIsEditing(!isEditing);
              }}
            >
              {isEditing ? Loc.Common.Cancel : Loc.Common.Edit}
            </Button>
            <SubmitButton disabled={!isEditing} loadingText={Loc.Common.Saving}>
              {Loc.Common.Save}
            </SubmitButton>
          </ButtonsWrapper>
        </Form>
      )}
    </FormikFormWrapper>
  );
}
