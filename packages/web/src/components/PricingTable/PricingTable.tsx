import React from "react";
import styles from "./PricingTable.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronsUp } from "@fortawesome/pro-solid-svg-icons";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import { Button, ButtonLink, ButtonsWrapper, StripePortalButton } from "..";
import { SubscriptionTier } from "@celeb-chat/shared/src/utils/ChatUtils";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { useUser } from "@/Hooks";
import { RouteHelper } from "@/Utils";

type SubscriptionTierData = {
  title: string;
  desc: string;
  features: string[];
  price?: string;
  tier: SubscriptionTier;
};

export namespace PricingTable {
  export type Props = {
    classes?: ClassesProp<"root">;
  };
}

export function PricingTable({ classes }: PricingTable.Props) {
  const tiers: SubscriptionTierData[] = [
    {
      tier: "free",
      title: "Free Tier",
      desc: "Some product description",
      price: "$0",
      features: ["Feature 1", "Feature 2"],
    },
    {
      tier: "two",
      title: "Standard Tier",
      desc: "Some product description",
      price: "$5",
      features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      tier: "three",
      title: "Premium Tier",
      desc: "Some product description",
      price: "$9",
      features: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
      ],
    },
  ];

  return (
    <div className={classNames(styles.tableWrapper, classes?.root)}>
      <div className={classNames(styles.table)}>
        {tiers.map((t, i) => (
          <SubscriptionItem {...t} key={i} />
        ))}
      </div>

      {/* // TODO: Update disclaimer wording */}
      <p className={styles.disclaimer}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
  );
}

type SubscriptionItemProps = SubscriptionTierData & {
  isTest?: boolean;
  user?: GetUserRequest.Response;
};

const SubscriptionItem = (props: SubscriptionItemProps) => {
  const { desc, features, isTest, title, price, tier } = props;

  const { user } = useUser();

  const isActiveTier = user?.subscriptionTier === tier;
  const isAuthenticated = !!user;

  const upgradeCTAText = isActiveTier ? "Active" : "Subscribe";
  const ctaText = isAuthenticated ? upgradeCTAText : "Select";

  const btnProps: Pick<Button.Props, "rightIcon" | "children"> = {
    rightIcon: isAuthenticated && !isActiveTier ? faChevronsUp : undefined,
    children: ctaText,
  };

  return (
    <div className={classNames(styles.tier, isActiveTier && styles.active)}>
      <div className={styles.upperContent}>
        <p className={styles.title}>{title}</p>

        <div className={styles.priceWrapper}>
          <p className={styles.price}>{price}</p>
          <span className={styles.period}>/ month</span>
        </div>

        <p className={styles.desc}>{desc}</p>

        <ButtonsWrapper align={BtnAlign.Left}>
          {user && <StripePortalButton tier={tier} />}
          {!user && (
            <ButtonLink {...btnProps} to={RouteHelper.UserDashboard()} />
          )}
        </ButtonsWrapper>
      </div>

      <div className={styles.features}>
        {features.map((f, i) => (
          <div className={styles.feature} key={i}>
            <FontAwesomeIcon className={styles.icon} icon={faCheck} />
            {f}
          </div>
        ))}
      </div>
    </div>
  );
};
