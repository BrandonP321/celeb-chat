import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { APIFetcher } from "utils/APIFetcher";
import {
  Alert,
  AppHelmet,
  ButtonsWrapper,
  LoadingContainer,
  PageHeader,
  PricingTable,
  ScrollablePage,
  StripePortalButton,
  TextAccentPrimary,
  TextAccentSecondary,
} from "@/Components";
import { Loc } from "@/Loc";
import { EditUserForm } from "./components/EditUserForm/EditUserForm";
import { VerifyEmailAlert } from "./components/PricingTable/StripePricingTable";
import { SubScriptionTierMap } from "@celeb-chat/shared/src/utils/ChatUtils";
import classNames from "classnames";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";

namespace UserDashboard {
  export type Props = {};
}

function UserDashboard(props: UserDashboard.Props) {
  const [user, setUser] = useState<GetUserRequest.Response | null>(null);

  useEffect(() => {
    APIFetcher.getUser()
      .then((user) => {
        setUser(user);
      })
      .catch(({ msg }: GetUserRequest.Error) => {
        // TODO: Handle fetch error
        console.log({ msg });
      });
  }, []);

  return (
    <ScrollablePage className={styles.userDash}>
      <AppHelmet title={Loc.Web.UserDash.Meta.Title} />
      <LoadingContainer loading={!user} loadingText="Loading dashboard" />
      <div className={styles.fixedWidthContent}>
        <PageHeader
          title={Loc.Web.UserDash.Title}
          desc={Loc.Web.UserDash.Blurb}
        />

        <Alert
          title="Something not looking quite right?"
          classes={{ root: classNames(styles.alert, styles.incorrectInfo) }}
        >
          <p className={styles.content}>
            If any of the details displayed on this dashboard look wrong, try
            refreshing the page. If the issue persists you can{" "}
            <a href={"mailto:support@personaverse.com"}>
              reach out to our support team.
            </a>
          </p>
        </Alert>

        {user && <EditUserForm user={user} />}

        <PageHeader
          classes={{ root: styles.pageHeader }}
          title={Loc.Web.UserDash.SubTitle}
          desc={Loc.Web.UserDash.SubBlurb}
        />
        {!user?.isEmailVerified && <VerifyEmailAlert />}

        {user?.stripeCustomerId && <SubscriptionDetails user={user} />}
      </div>

      <PricingTable classes={{ root: styles.table }} />
    </ScrollablePage>
  );
}

const tierTitleMap: SubScriptionTierMap<string> = {
  free: "Free tier",
  two: "Standard Tier",
  three: "Premium Tier",
};

type SubscriptionDetailsProps = {
  user: GetUserRequest.Response;
};

const SubscriptionDetails = ({ user }: SubscriptionDetailsProps) => {
  const { canceledAt, endedAt, isActive, renewalDate, tierToRenew } =
    user.subscription ?? {};
  const plan = user.subscription?.plans?.[user.activeSubscriptionTier];

  const isFreeTier = user.activeSubscriptionTier === "free";

  // TODO: move to utility function
  const getDate = (date: number) => new Date(date * 1000).toDateString();
  const tierTitle = tierTitleMap[user.activeSubscriptionTier];

  return (
    <div className={styles.subDetails}>
      <p className={classNames(styles.detail, styles.tier)}>
        <strong>Current Subscription:</strong>{" "}
        <TextAccentSecondary>
          {tierTitleMap[user.activeSubscriptionTier]}
        </TextAccentSecondary>
      </p>

      <ButtonsWrapper className={styles.manageSubWrapper} align={BtnAlign.Left}>
        <StripePortalButton
          rightIcon={faPenToSquare}
          classes={{ root: styles.manageBtn }}
        >
          Manage Subscription
        </StripePortalButton>
      </ButtonsWrapper>

      {renewalDate && !canceledAt && (
        <Alert
          classes={{ root: styles.alert }}
          title={`${tierTitleMap[tierToRenew]} renews on ${getDate(
            renewalDate
          )}`}
        >
          <p className={styles.content}>
            We will automatically charge the payment method used for your most
            recent subscription creation or renewal. If the payment fails, you
            may have up to 2 days to remediate before access is revoked.
          </p>
        </Alert>
      )}

      {canceledAt && plan && !isFreeTier && (
        <Alert
          type="warning"
          classes={{ root: styles.alert, contentWrapper: styles.content }}
          title={`Subscription will be canceled on ${getDate(
            plan.accessExpirationDate
          )}`}
        >
          <p className={styles.content}>
            On <TextAccentPrimary>{getDate(canceledAt)}</TextAccentPrimary>, you
            canceled your {tierTitle} subscription. You have until{" "}
            <TextAccentPrimary>
              {getDate(plan.accessExpirationDate)}
            </TextAccentPrimary>{" "}
            to update your plan, otherwise you will lose access to the perks of
            the {tierTitle}.
          </p>
        </Alert>
      )}
    </div>
  );
};

export default UserDashboard;
