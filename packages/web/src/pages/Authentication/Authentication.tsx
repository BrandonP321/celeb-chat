import React, { useState } from "react";
import { Formik, FormikProps, Form } from "formik";
import { LoginSchema, RegistrationSchema } from "@celeb-chat/shared/src/schema";
import styles from "./Authentication.module.scss";
import { FormikSubmit } from "utils/UtilityTypes";
import { InputField } from "@/Components";
import { APIFetcher } from "utils/APIFetcher";
import { LoginRequest } from "@celeb-chat/shared/src/api/Requests/auth.requests";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

namespace Authentication {
  export type Props = {
    isLogin?: boolean;
  };
}

function Authentication({ isLogin }: Authentication.Props) {
  /** If true, shows login portal, else registration portal */
  const [showLoginPortal, setShowLoginPortal] = useState(!!isLogin);

  return (
    <div className={styles.auth}>
      <div className={styles.authFormWrapper}>
        {showLoginPortal && <LoginForm />}
        {!showLoginPortal && <RegistrationForm />}
      </div>
    </div>
  );
}

enum LoginField {
  Email = "email",
  Password = "password",
}

namespace LoginForm {
  export type Values = {
    [LoginField.Email]: string;
    [LoginField.Password]: string;
  };

  export type Formik = FormikProps<Values>;
}

const LoginInitialValues: LoginForm.Values = {
  email: "",
  password: "",
};

function LoginForm() {
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState<string>();

  const handleSubmit: FormikSubmit<LoginForm.Values> = (values, formik) => {
    const { email, password } = values;

    setLoginError(undefined);

    return APIFetcher.login({ email, password })
      .then(() => {
        navigate("/chat/asdf", { replace: true });
      })
      .catch(({ response }: AxiosError<LoginRequest.Error>) => {
        setLoginError(response?.data.msg);
      });
  };

  return (
    <Formik
      initialValues={LoginInitialValues}
      validationSchema={LoginSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, values, isSubmitting }) => {
        console.log({ isSubmitting });
        return (
          <Form className={styles.authForm}>
            <h1 className={styles.formHeading}>Login</h1>
            <div>
              <InputField
                id={LoginField.Email}
                name={LoginField.Email}
                error={errors[LoginField.Email]}
                label="Email"
              />
              <InputField
                id={LoginField.Password}
                name={LoginField.Password}
                error={errors[LoginField.Password]}
                type={"password"}
                label="Password"
              />
            </div>
            {loginError && <p className={styles.errorMsg}>{loginError}</p>}
            <button>Login</button>
          </Form>
        );
      }}
    </Formik>
  );
}

enum RegistrationField {
  Email = "email",
  Password = "password",
  PasswordConfirm = "passwordConfirmation",
  Username = "username",
}

namespace RegistrationForm {
  export type Values = { [key in RegistrationField]: string };

  export type Formik = FormikProps<Values>;
}

const RegistrationInitialValues: RegistrationForm.Values = {
  email: "",
  password: "",
  passwordConfirmation: "",
  username: "",
};

function RegistrationForm() {
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState<string>();

  const handleSubmit: FormikSubmit<RegistrationForm.Values> = async (
    values,
    formik
  ) => {
    const { email, password, username } = values;

    setRegisterError(undefined);

    return APIFetcher.register({ email, password, username })
      .then(() => {
        navigate("/chat/asdf", { replace: true });
      })
      .catch(({ response }: AxiosError<LoginRequest.Error>) => {
        setRegisterError(response?.data.msg);
      });
  };

  return (
    <Formik
      initialValues={RegistrationInitialValues}
      validationSchema={RegistrationSchema}
      validateOnChange={false}
      onSubmit={handleSubmit}
    >
      {({ errors, values, isSubmitting }) => {
        console.log({ isSubmitting });
        return (
          <Form className={styles.authForm}>
            <h1 className={styles.formHeading}>Register</h1>
            <div>
              <InputField
                id={RegistrationField.Email}
                name={RegistrationField.Email}
                error={errors[RegistrationField.Email]}
                label="Email"
              />
              <InputField
                id={RegistrationField.Username}
                name={RegistrationField.Username}
                error={errors[RegistrationField.Username]}
                label="Username"
              />
              <InputField
                id={RegistrationField.Password}
                name={RegistrationField.Password}
                error={errors[RegistrationField.Password]}
                type={"password"}
                label="Password"
              />
              <InputField
                id={RegistrationField.PasswordConfirm}
                name={RegistrationField.PasswordConfirm}
                error={errors[RegistrationField.PasswordConfirm]}
                type={"password"}
                label="Confirm Password"
              />
            </div>

            {registerError && (
              <p className={styles.errorMsg}>{registerError}</p>
            )}

            <button>Register</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default Authentication;
