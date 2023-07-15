import React from "react";
import styles from "./PricingTable.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronsUp } from "@fortawesome/pro-solid-svg-icons";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import { Button, ButtonLink, ButtonsWrapper, StripePortalButton } from "..";
import {
  ChatUtils,
  SubScriptionTierMap,
  SubscriptionTier,
} from "@celeb-chat/shared/src/utils/ChatUtils";
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

const tierFeaturedChatMap: SubScriptionTierMap<number | undefined> = {
  free: 2,
  two: 10,
  three: undefined,
};

export function PricingTable({ classes }: PricingTable.Props) {
  let tiers: SubscriptionTierData[] = [
    {
      tier: "free",
      title: "Explorer Plan",
      desc: "Your Adventure Begins Here",
      price: "$0",
      features: ["Persona maintains a limited degree of conversation history"],
    },
    {
      tier: "two",
      title: "Journeyman Plan",
      desc: "Unlock More, Discover More",
      price: "$5",
      features: [
        "Persona maintains an expanded degree of conversation history",
        "Enhanced level of persona customization",
      ],
    },
    {
      tier: "three",
      title: "Zenith Plan",
      desc: "Peak Experience, No Limits",
      price: "$9",
      features: [
        "Persona maintains an unrestricted degree of conversation history",
        "Ultimate level of persona customization",
      ],
    },
  ];

  tiers = tiers.map((t: SubscriptionTierData) => {
    const maxChats = ChatUtils.maxChatTierMap[t.tier];
    const maxFeaturedChats = tierFeaturedChatMap[t.tier];

    return {
      ...t,
      features: [
        ...t.features,
        `Compose messages up to ${
          ChatUtils.maxMsgCharCountMap[t.tier]
        } characters long`,
        `Maintain ${
          maxChats > 1
            ? `up to ${maxChats} at a once`
            : "a single chat at a time"
        }`,
        `Unlock ${
          maxFeaturedChats ?? "unlimited"
        } featured chats per month (coming soon!)`,
      ],
    };
  });

  return (
    <div className={classNames(styles.tableWrapper, classes?.root)}>
      <div className={classNames(styles.table)}>
        {tiers.map((t, i) => (
          <SubscriptionItem {...t} key={i} />
        ))}
      </div>

      <p className={styles.disclaimer}>
        *Prices, features, and terms of PersonaVerse subscriptions may change
        without prior notice.
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

        <p className={styles.desc}>{desc}</p>

        <div className={styles.priceWrapper}>
          <p className={styles.price}>{price}</p>
          <span className={styles.period}>/ month</span>
        </div>

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
            <div className={styles.text}>{f}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
