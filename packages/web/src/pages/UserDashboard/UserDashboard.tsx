import React, { useEffect, useState } from "react";
import styles from "./UserDashboard.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { APIFetcher } from "utils/APIFetcher";
import {
  AppHelmet,
  LoadingContainer,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { Loc } from "@/Loc";
import { EditUserForm } from "./components/EditUserForm/EditUserForm";
import {
  PricingTable,
  VerifyEmailAlert,
} from "./components/PricingTable/PricingTable";
import { SubScriptionTierMap } from "@celeb-chat/shared/src/utils/ChatUtils";

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

        <h2>Subscription Settings</h2>
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

  return (
    <div>
      <p>
        Current Subscription Tier: {tierTitleMap[user.activeSubscriptionTier]}
      </p>

      {renewalDate && !canceledAt && (
        <p>
          {tierTitleMap[tierToRenew]} renews on {getDate(renewalDate)}
        </p>
      )}

      {canceledAt && plan && !isFreeTier && (
        <p>
          Subscription was canceled on {getDate(canceledAt)}. Subscription will
          end on {getDate(plan.accessExpirationDate)}
        </p>
      )}
    </div>
  );
};

export default UserDashboard;
