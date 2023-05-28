import React from "react";
import {
  ConfirmPasswordInputField,
  EmailInputField,
  FieldName,
  PasswordInputField,
  UsernameInputField,
} from "@/Components";

enum LoginField {
  EmailOrUsername = "emailOrUsername",
  Password = FieldName.Password,
}

export namespace LoginForm {
  export type Values = { [key in LoginField]: string };
}

export const LoginInitialValues: LoginForm.Values = {
  emailOrUsername: "",
  password: "",
};

export const LoginFormFields = () => (
  <>
    <EmailInputField name={LoginField.EmailOrUsername} autoComplete="email" />
    <PasswordInputField autoComplete="password" />
  </>
);

enum RegistrationField {
  Email = FieldName.Email,
  Password = FieldName.Password,
  PasswordConfirm = "passwordConfirmation",
  Username = FieldName.Username,
}

export namespace RegistrationForm {
  export type Values = { [key in RegistrationField]: string };
}

export const RegistrationInitialValues: RegistrationForm.Values = {
  email: "",
  password: "",
  passwordConfirmation: "",
  username: "",
};

export const RegistrationFormFields = () => (
  <>
    <EmailInputField autoComplete="email" />
    <UsernameInputField autoComplete="off" />
    <PasswordInputField autoComplete="password" />
    <ConfirmPasswordInputField
      name={RegistrationField.PasswordConfirm}
      autoComplete="off"
    />
  </>
);
