import React, { useMemo } from "react";
import styles from "./PricingTable.module.scss";
import { GetUserRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faChevronsUp } from "@fortawesome/pro-solid-svg-icons";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import {
  Button,
  ButtonLink,
  ButtonsWrapper,
  QuestionIconToolTip,
  Sheen,
  StripePortalButton,
} from "..";
import {
  ChatUtils,
  SubscriptionTier,
} from "@celeb-chat/shared/src/utils/ChatUtils";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { useResponsive, useUser } from "@/Hooks";
import { RouteHelper } from "@/Utils";
import { SubscriptionUtils } from "@celeb-chat/shared/src/utils";

type SubscriptionTierData = {
  title: string;
  desc: string;
  features: (string | JSX.Element)[];
  price?: string;
  tier: SubscriptionTier;
};

export namespace PricingTable {
  export type Props = {
    classes?: ClassesProp<"root">;
  };
}

const subscriptionTiers: SubscriptionTierData[] = [
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
      <>
        Persona maintains an{" "}
        <span className={styles.bold}>
          unrestricted degree of conversation history
        </span>
      </>,
      <>
        <span className={styles.bold}>Ultimate</span> level of{" "}
        <span>persona customization</span>
      </>,
    ],
  },
];

export function PricingTable({ classes }: PricingTable.Props) {
  const tiers = useMemo(
    () =>
      subscriptionTiers.map((t: SubscriptionTierData) => {
        const maxChats = ChatUtils.maxChatCount(t.tier);
        const maxFeaturedChats =
          SubscriptionUtils.maxMonthlyFeaturedChatsTierMap[t.tier];

        return {
          ...t,
          features: [
            ...t.features,
            <>
              Compose{" "}
              <span className={styles.bold}>
                messages up to {ChatUtils.maxMsgCharCount(t.tier)} characters
                long{" "}
              </span>
              <QuestionIconToolTip>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </QuestionIconToolTip>
            </>,
            <>
              Maintain{" "}
              {maxChats > 1 ? (
                <>
                  up to <span className={styles.bold}>{maxChats} chats</span> at
                  once
                </>
              ) : (
                "a single chat at a time"
              )}
            </>,
            <>
              Unlock{" "}
              <span className={styles.bold}>
                {maxFeaturedChats ?? "unlimited"} featured chats
              </span>{" "}
              each month (coming soon!)
            </>,
          ],
        };
      }),
    []
  );

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
  const { mobile } = useResponsive();

  const isActiveTier = user?.subscriptionTier === tier;
  const isAuthenticated = !!user;

  const upgradeCTAText = isActiveTier ? "Active" : "Subscribe";
  const ctaText = isAuthenticated ? upgradeCTAText : "Select";

  const showTierSheen = tier === "three" && !mobile;
  const showBtnSheen = tier === "three" && mobile;

  const btnProps: Pick<Button.Props, "rightIcon" | "children" | "withSheen"> = {
    rightIcon: isAuthenticated && !isActiveTier ? faChevronsUp : undefined,
    children: ctaText,
    withSheen: showBtnSheen,
  };

  return (
    <div className={classNames(styles.tier, isActiveTier && styles.active)}>
      {showTierSheen && <Sheen hideOnHover />}
      <div className={styles.upperContent}>
        <p className={styles.title}>{title}</p>

        <p className={styles.desc}>{desc}</p>

        <div className={styles.priceWrapper}>
          <p className={styles.price}>{price}</p>
          <span className={styles.period}>/ month</span>
        </div>

        <ButtonsWrapper align={BtnAlign.Left}>
          {user && <StripePortalButton tier={tier} withSheen={showBtnSheen} />}
          {!user && (
            <ButtonLink {...btnProps} to={RouteHelper.UserDashboard()} />
          )}
        </ButtonsWrapper>
      </div>

      <div className={styles.features}>
        {features.map((f, i) => (
          <div className={styles.feature} key={i}>
            <FontAwesomeIcon className={styles.icon} icon={faCheck} />
            <p className={styles.text}>{f}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
