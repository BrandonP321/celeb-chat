import React, { useState } from "react";
import { Formik, Form } from "formik";
import { LoginSchema, RegistrationSchema } from "@celeb-chat/shared/src/schema";
import styles from "./Authentication.module.scss";
import { FormikSubmit } from "utils/UtilityTypes";
import { Button, ButtonsWrapper } from "@/Components";
import { APIFetcher } from "utils/APIFetcher";
import { useNavigate } from "react-router-dom";
import {
  LoginForm,
  LoginFormFields,
  LoginInitialValues,
  RegistrationForm,
  RegistrationFormFields,
  RegistrationInitialValues,
} from "./AuthForms";
import { APIErrorResponse } from "@celeb-chat/shared/src/api/Requests";
import { UrlUtils } from "utils/UrlUtils";

namespace Authentication {
  export type Props = {
    isLogin?: boolean;
  };
}

function Authentication({ isLogin }: Authentication.Props) {
  const navigate = useNavigate();

  /** If true, shows login portal, else registration portal */
  const [showLogin, setShowLogin] = useState(!!isLogin);
  const [apiError, setAPIError] = useState<string>();

  const handleLoginSubmit: FormikSubmit<LoginForm.Values> = (values) => {
    return APIFetcher.login(values);
  };

  const handleRegistrationSubmit: FormikSubmit<RegistrationForm.Values> = (
    values
  ) => {
    const { email, password, username } = values;

    return APIFetcher.register({ email, password, username });
  };

  const handleSubmit = <Handler extends FormikSubmit<any>>(
    values: any,
    formik: any,
    apiCall: Handler
  ) => {
    setAPIError(undefined);

    return apiCall(values, formik)
      .then(() => {
        const redirectPath = UrlUtils.getParam(
          UrlUtils.queryParamKeys.redirectTo
        );

        navigate(redirectPath ?? "/chat/asdf", { replace: true });
      })
      .catch(({ msg }: APIErrorResponse<{}>) => {
        setAPIError(msg);
      });
  };

  return (
    <div className={styles.auth}>
      <div className={styles.authFormWrapper}>
        <Formik
          initialValues={
            showLogin ? LoginInitialValues : RegistrationInitialValues
          }
          validationSchema={showLogin ? LoginSchema : RegistrationSchema}
          validateOnChange={false}
          onSubmit={(values, formik) =>
            handleSubmit(
              values,
              formik,
              showLogin ? handleLoginSubmit : handleRegistrationSubmit
            )
          }
        >
          {({ errors, isSubmitting, resetForm }) => (
            <Form className={styles.authForm}>
              <h1 className={styles.formHeading}>
                {showLogin ? "Login" : "Register"}
              </h1>

              <div>
                {showLogin && <LoginFormFields />}
                {!showLogin && <RegistrationFormFields />}
              </div>

              {apiError && <p className={styles.errorMsg}>{apiError}</p>}

              <ButtonsWrapper className={styles.formBtns}>
                <Button type="submit">
                  {showLogin ? "Login" : "Register"}
                </Button>
              </ButtonsWrapper>

              <p className={styles.formSwitchBlurb}>
                <span>
                  {showLogin && "Don't have an account? "}
                  {!showLogin && "Already have an account? "}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                    setShowLogin(!showLogin);
                  }}
                >
                  {showLogin && "Register now"}
                  {!showLogin && "Login now"}
                </button>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Authentication;
