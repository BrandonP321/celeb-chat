import React, { useEffect, useState } from "react";
import styles from "./EmailVerification.module.scss";
import {
  Alert,
  AppHelmet,
  LoadingContainer,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { APIFetcher, UrlUtils } from "@/Utils";

export function EmailVerification() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasAttemptedVerify, setHasAttemptedVerify] = useState(false);

  useEffect(() => {
    const hash = UrlUtils.getParam("hash") ?? "";
    const userId = UrlUtils.getParam("userId") ?? "";

    APIFetcher.verifyEmail({ hash, userId })
      .then(() => setIsSuccess(true))
      .catch(() => setIsSuccess(false))
      .finally(() => setHasAttemptedVerify(true));
  }, []);

  return (
    <ScrollablePage>
      <AppHelmet title="Verify Email" />
      <LoadingContainer
        loading={!hasAttemptedVerify}
        loadingText="Verifying Email"
      />

      <PageHeader title="Email Verification" />

      {isSuccess && (
        <Alert type="success" title="Email verification successful!">
          Congrats, your email address has been successfully verified! You now
          have full access to all the features of PersonaVerse. Enjoy conversing
          with your favorite personas and unlock a universe of possibilities.
          Let's get started!
        </Alert>
      )}
      {!isSuccess && (
        <Alert type="warning" title="Email Verification Failed!">
          Oops! We were unable to verify your email address. The verification
          link may have expired or may not be correct. Please check your email
          for the correct link or request a new verification email from your
          user dashboard. We're here to help you get back on track.
        </Alert>
      )}
    </ScrollablePage>
  );
}
