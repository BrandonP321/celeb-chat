import React, { CSSProperties, useState } from "react";
import {
  GetUserRequest,
  SendEmailVerificationRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import { Alert, Button, ButtonsWrapper } from "@/Components";
import styles from "./PricingTable.module.scss";
import { Loc } from "@/Loc";
import { APIFetcher } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";

export namespace PricingTable {
  export type Props = {
    user: GetUserRequest.Response | null;
  };
}

export function PricingTable({ user }: PricingTable.Props) {
  const disabledStyle: CSSProperties = {
    opacity: "0.5",
    pointerEvents: "none",
  };

  return (
    <div className={"personaverse-pricing-table"}>
      {user?.id && (
        <stripe-pricing-table
          style={!user.isEmailVerified ? disabledStyle : undefined}
          client-reference-id={user.id}
          pricing-table-id={process.env.REACT_APP_PRICING_TABLE_ID}
          publishable-key={process.env.REACT_APP_PRICING_TABLE_KEY}
        ></stripe-pricing-table>
      )}
    </div>
  );
}

export const VerifyEmailAlert = () => {
  const dispatch = useAppDispatch();
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const sendVerificationEmail = () => {
    setIsSendingEmail(true);

    APIFetcher.sendEmailVerificationEmail()
      .then(() => {
        dispatch(
          Actions.Alert.addSuccessAlert({
            msg: "Verification email has been sent.",
          })
        );
        setIsEmailSent(true);
      })
      .catch(({ msg }: SendEmailVerificationRequest.Error) => {
        dispatch(Actions.Alert.addErrorAlert({ msg }));
      })
      .finally(() => setIsSendingEmail(false));
  };

  return (
    <Alert
      type="warning"
      title="Email not verified"
      classes={{ root: styles.emailAlert }}
    >
      <div className={styles.emailAlertBody}>
        <p className={styles.blurb}>{Loc.Web.UserDash.EMailAlertBlurb}</p>
        <ButtonsWrapper>
          <Button
            variant="danger"
            classes={{ root: styles.button }}
            loading={isSendingEmail}
            disabled={isEmailSent}
            loadingText="Sending"
            onClick={sendVerificationEmail}
          >
            {isEmailSent ? "Email Sent" : "Send Email"}
          </Button>
        </ButtonsWrapper>
      </div>
    </Alert>
  );
};
