import React, { useState } from "react";
import { Formik, Form } from "formik";
import { LoginSchema, RegistrationSchema } from "@celeb-chat/shared/src/schema";
import styles from "./Authentication.module.scss";
import { FormikSubmit } from "utils/UtilityTypes";
import {
  Button,
  ButtonsWrapper,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { APIFetcher } from "utils/APIFetcher";
import { Link, useNavigate } from "react-router-dom";
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
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import { UserModel } from "@celeb-chat/shared/src/api/models/User.model";
import { Loc } from "@/Loc";

namespace Authentication {
  export type Props = {
    isLogin?: boolean;
  };
}

function Authentication({ isLogin }: Authentication.Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const handleSubmit = async <
    Handler extends FormikSubmit<any, UserModel.ShallowJSON>
  >(
    values: any,
    formik: any,
    apiCall: Handler
  ) => {
    setAPIError(undefined);

    return apiCall(values, formik)
      .then((user) => {
        const redirectPath = UrlUtils.getParam(
          UrlUtils.queryParamKeys.redirectTo
        );
        dispatch(Actions.User.setUser(user));
        // TODO: Don't navigate to /chat/asdf
        navigate(redirectPath ?? "/chat/asdf", { replace: true });
      })
      .catch(({ msg }: APIErrorResponse<{}>) => {
        setAPIError(msg);
      });
  };

  return (
    <ScrollablePage className={styles.auth}>
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
          {({ isSubmitting, resetForm }) => (
            <Form className={styles.authForm} autoComplete="on">
              <PageHeader
                title={
                  showLogin
                    ? Loc.Web.Auth.LoginHeader
                    : Loc.Web.Auth.RegisterHeader
                }
              />

              <div>
                {showLogin && <LoginFormFields />}
                {!showLogin && <RegistrationFormFields />}
              </div>

              {apiError && <p className={styles.errorMsg}>{apiError}</p>}

              <ButtonsWrapper className={styles.formBtns}>
                <Button
                  type="submit"
                  loading={isSubmitting}
                  loadingText={
                    showLogin
                      ? Loc.Web.Auth.LoggingIn
                      : Loc.Web.Auth.Registering
                  }
                >
                  {showLogin ? Loc.Web.Auth.Login : Loc.Web.Auth.Register}
                </Button>
              </ButtonsWrapper>

              <p className={styles.formSwitchBlurb}>
                <span>
                  {showLogin && Loc.Web.Auth.ShowRegister}
                  {!showLogin && Loc.Web.Auth.ShowLogin}
                </span>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    resetForm();
                    setShowLogin(!showLogin);
                  }}
                >
                  {showLogin && Loc.Web.Auth.RegisterNow}
                  {!showLogin && Loc.Web.Auth.LoginNow}
                </button>
              </p>

              {showLogin && (
                <Link
                  className={styles.forgotPass}
                  to="/password/reset/request"
                >
                  {Loc.Web.Auth.ForgotPassword}
                </Link>
              )}
              <p></p>
            </Form>
          )}
        </Formik>
      </div>
    </ScrollablePage>
  );
}

export default Authentication;
