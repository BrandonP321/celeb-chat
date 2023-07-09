import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { APIFetcher } from "utils/APIFetcher";
import {
  Alert,
  AppHelmet,
  ButtonLink,
  ButtonsWrapper,
  LoadingContainer,
  PageHeader,
  ScrollablePage,
  TextAccentPrimary,
  TextAccentSecondary,
} from "@/Components";
import { Loc } from "@/Loc";
import { EditUserForm } from "./components/EditUserForm/EditUserForm";
import {
  PricingTable,
  VerifyEmailAlert,
} from "./components/PricingTable/PricingTable";
import { SubScriptionTierMap } from "@celeb-chat/shared/src/utils/ChatUtils";
import classNames from "classnames";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { faPenToSquare } from "@fortawesome/pro-solid-svg-icons";
import { StripeUtils } from "@/Utils";

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

        <PageHeader
          classes={{ root: styles.pageHeader }}
          title={Loc.Web.UserDash.SubTitle}
          desc={Loc.Web.UserDash.SubBlurb}
        />
        {!user?.isEmailVerified && <VerifyEmailAlert />}

        {user?.stripeCustomerId && <SubscriptionDetails user={user} />}
      </div>

      <PricingTable user={user} />

      <div className={styles.fixedWidthContent}>
        <h2 className={styles.account}>Account Settings</h2>

        {user && <EditUserForm user={user} />}
      </div>
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
      <ButtonsWrapper className={styles.manageSubWrapper} align={BtnAlign.Left}>
        <ButtonLink
          classes={{ root: styles.manageBtn }}
          rightIcon={faPenToSquare}
          target="_blank"
          to={
            StripeUtils.getSubscriptionManagementUrl(
              !!user?.useStripeTest,
              user?.email
            ) ?? "#"
          }
        >
          Manage Subscription
        </ButtonLink>
      </ButtonsWrapper>

      <p className={classNames(styles.detail, styles.tier)}>
        <strong>Current Subscription:</strong>{" "}
        <TextAccentSecondary>
          {tierTitleMap[user.activeSubscriptionTier]}
        </TextAccentSecondary>
      </p>

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
