import React, { CSSProperties, useState } from "react";
import {
  GetUserRequest,
  SendEmailVerificationRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import { Alert, Button, ButtonsWrapper } from "@/Components";
import styles from "./StripePricingTable.module.scss";
import { Loc } from "@/Loc";
import { APIFetcher, StripeUtils } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";

export namespace StripePricingTable {
  export type Props = {
    user: GetUserRequest.Response | null;
  };
}

export function StripePricingTable({ user }: StripePricingTable.Props) {
  const disabledStyle: CSSProperties = {
    opacity: "0.5",
    pointerEvents: "none",
  };

  const showTable = user?.id && user?.email && !user.stripeCustomerId;

  return (
    <div className={"personaverse-pricing-table"}>
      {showTable && (
        <stripe-pricing-table
          style={!user.isEmailVerified ? disabledStyle : undefined}
          client-reference-id={user.id}
          customer-email={user.email}
          pricing-table-id={StripeUtils.pricingTable(user.useStripeTest).id}
          publishable-key={StripeUtils.pricingTable(user.useStripeTest).key}
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
