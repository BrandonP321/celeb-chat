import { InputField } from "@/Components";
import { FormikConfig, FormikErrors, FormikProps } from "formik";
import React from "react";

enum LoginField {
  Email = "email",
  Password = "password",
}

export namespace LoginForm {
  export type Values = {
    [LoginField.Email]: string;
    [LoginField.Password]: string;
  };

  export type Formik = FormikProps<Values>;
  export type Errors = FormikErrors<Values>;
  export type FormConfig = FormikConfig<Values>;

  export type Props = {
    errors: Errors;
  };
}

export const LoginInitialValues: LoginForm.Values = {
  email: "",
  password: "",
};

export const LoginFormFields = ({ errors }: LoginForm.Props) => (
  <>
    <InputField
      name={LoginField.Email}
      error={errors[LoginField.Email]}
      label="Email"
    />
    <InputField
      name={LoginField.Password}
      error={errors[LoginField.Password]}
      type={"password"}
      label="Password"
    />
  </>
);

enum RegistrationField {
  Email = "email",
  Password = "password",
  PasswordConfirm = "passwordConfirmation",
  Username = "username",
}

export namespace RegistrationForm {
  export type Values = { [key in RegistrationField]: string };

  export type Formik = FormikProps<Values>;
  export type Errors = FormikErrors<Values>;

  export type Props = {
    errors: Errors;
  };
}

export const RegistrationInitialValues: RegistrationForm.Values = {
  email: "",
  password: "",
  passwordConfirmation: "",
  username: "",
};

export const RegistrationFormFields = ({ errors }: RegistrationForm.Props) => (
  <>
    <InputField
      name={RegistrationField.Email}
      error={errors[RegistrationField.Email]}
      label="Email"
    />
    <InputField
      name={RegistrationField.Username}
      error={errors[RegistrationField.Username]}
      label="Username"
    />
    <InputField
      name={RegistrationField.Password}
      error={errors[RegistrationField.Password]}
      type={"password"}
      label="Password"
    />
    <InputField
      name={RegistrationField.PasswordConfirm}
      error={errors[RegistrationField.PasswordConfirm]}
      type={"password"}
      label="Confirm Password"
    />
  </>
);
