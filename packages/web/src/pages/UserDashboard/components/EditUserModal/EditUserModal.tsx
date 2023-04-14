import React from "react";
import styles from "./EditUserModal.module.scss";
import { InputField, SaveModal } from "@/Components";
import { Form } from "formik";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { FormikStringValues } from "utils/UtilityTypes";

enum EditUserField {
  Username = "username",
}

type EditUserValues = FormikStringValues<EditUserField>;

namespace EditUserModal {
  export type Props = Pick<
    SaveModal.Props,
    "onCancel" | "onSave" | "show" | "hide"
  > & {};
}

function EditUserModal(props: EditUserModal.Props) {
  return (
    <SaveModal {...props} title="Edit User">
      <Form>
        <InputField name={EditUserField.Username} label="Username" />
      </Form>
    </SaveModal>
  );
}

export const getEditUserInitialValues = (
  user: GetUserRequest.Response
): EditUserValues => ({
  username: user.username ?? "",
});

export default EditUserModal;
