import { InputField } from "@/Components";
import { Loc } from "@/Loc";
import React from "react";

enum LoginField {
  Email = "email",
  Password = "password",
}

export namespace LoginForm {
  export type Values = { [key in LoginField]: string };
}

export const LoginInitialValues: LoginForm.Values = {
  email: "",
  password: "",
};

export const LoginFormFields = () => (
  <>
    <InputField name={LoginField.Email} label={Loc.Common.Email} />
    <InputField
      name={LoginField.Password}
      type={"password"}
      label={Loc.Common.Password}
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
}

export const RegistrationInitialValues: RegistrationForm.Values = {
  email: "",
  password: "",
  passwordConfirmation: "",
  username: "",
};

export const RegistrationFormFields = () => (
  <>
    <InputField name={RegistrationField.Email} label={Loc.Common.Email} />
    <InputField name={RegistrationField.Username} label={Loc.Common.Username} />
    <InputField
      name={RegistrationField.Password}
      type={"password"}
      label={Loc.Common.Password}
    />
    <InputField
      name={RegistrationField.PasswordConfirm}
      type={"password"}
      label={Loc.Common.ConfirmPassword}
    />
  </>
);
