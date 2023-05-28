import React from "react";
import styles from "./FormHelpers.module.scss";
import { InputField } from "@/Components";
import { Loc } from "@/Loc";

export enum FieldName {
  Email = "email",
  Password = "password",
  ConfirmPassword = "confirmPassword",
  Username = "username",
}

export namespace FormWarningMsg {
  export type Props = React.PropsWithChildren<{}>;
}

export function FormWarningMsg({ children }: FormWarningMsg.Props) {
  return <p className={styles.warningMsg}>{children}</p>;
}

export const EmailInputField = (props: Partial<InputField.Props>) => (
  <InputField
    name={FieldName.Email}
    label={Loc.Common.Email}
    type="email"
    {...props}
  />
);

export const PasswordInputField = (props: Partial<InputField.Props>) => (
  <InputField
    name={FieldName.Password}
    label={Loc.Common.Password}
    type="password"
    {...props}
  />
);

export const ConfirmPasswordInputField = (props: Partial<InputField.Props>) => (
  <InputField
    name={FieldName.ConfirmPassword}
    label={Loc.Common.ConfirmPassword}
    type="password"
    {...props}
  />
);

export const UsernameInputField = (props: Partial<InputField.Props>) => (
  <InputField
    name={FieldName.Username}
    label={Loc.Common.Username}
    {...props}
  />
);
