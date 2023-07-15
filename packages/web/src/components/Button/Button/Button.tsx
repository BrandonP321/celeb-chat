import classNames from "classnames";
import React, { useState } from "react";
import {
  ClassesProp,
  HTMLLinkProps,
  HTMLButtonProps,
  HTMLProps,
} from "utils/UtilityTypes";
import styles from "./Button.module.scss";
import { Modal, Sheen, Spinner } from "@/Components";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";
import { Loc } from "@/Loc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useAppDispatch, useUser } from "@/Hooks";
import { APIFetcher } from "utils/APIFetcher";
import {
  CreateCheckoutSessionRequest,
  CreatePortalSessionRequest,
} from "@celeb-chat/shared/src/api/Requests/stripe.requests";
import { UrlUtils } from "utils/UrlUtils";
import { Actions } from "@/Slices";
import { SubscriptionTier } from "@celeb-chat/shared/src/utils/ChatUtils";
import { faChevronsUp } from "@fortawesome/pro-solid-svg-icons";

type ButtonHTMLProps = HTMLButtonProps & {
  to?: undefined;
  disabled?: boolean;
};
type LinkHTMLProps = Omit<HTMLLinkProps, "href"> & {
  to: string;
  disabled?: undefined;
};

export namespace ButtonBase {
  export type Props = React.PropsWithChildren<{
    classes?: ClassesProp<"root">;
    leftIcon?: IconProp;
    rightIcon?: IconProp;
    withSheen?: boolean;
    variant?:
      | "primary"
      | "primaryGradient"
      | "secondary"
      | "secondaryGradient"
      | "danger"
      | "black"
      | "help"
      | "empty";
  }>;

  export type OwnProps = Omit<ButtonHTMLProps | LinkHTMLProps, "className"> &
    Props;
}

export function ButtonBase(props: ButtonBase.OwnProps) {
  const {
    children,
    classes,
    variant = "primaryGradient",
    leftIcon,
    rightIcon,
    withSheen,
    ...rest
  } = props;

  const eleProps: HTMLProps = {
    ...rest,
    className: classNames(styles.btn, classes?.root, styles[variant]),
  };

  const inner = (
    <>
      {withSheen && <Sheen duration={3} />}
      <div className={styles.btnBg} />
      <span>
        {leftIcon && (
          <>
            <FontAwesomeIcon icon={leftIcon} className={styles.icon} />
            &nbsp;&nbsp;
          </>
        )}
        {children}
        {rightIcon && (
          <>
            &nbsp;&nbsp;
            <FontAwesomeIcon icon={rightIcon} className={styles.icon} />
          </>
        )}
      </span>
    </>
  );

  return !rest.to ? (
    <button {...(eleProps as ButtonHTMLProps)}>{inner}</button>
  ) : (
    <Link {...(eleProps as LinkHTMLProps)}>{inner}</Link>
  );
}

export namespace Button {
  export type Props = HTMLButtonProps &
    ButtonBase.Props & {
      loading?: boolean;
      loadingText?: string;
    };
}

export function Button(props: Button.Props) {
  const { disabled, loading, loadingText, children, type, ...rest } = props;

  return (
    <ButtonBase
      {...rest}
      type={type ?? "button"}
      disabled={disabled || loading}
    >
      {loading ? (
        <span>
          <Spinner classes={{ root: styles.spinner }} />
          {loadingText && <span>&nbsp;{loadingText}</span>}
        </span>
      ) : (
        children
      )}
    </ButtonBase>
  );
}

export namespace ButtonLink {
  export type Props = LinkHTMLProps & ButtonBase.Props & {};
}

export function ButtonLink(props: ButtonLink.Props) {
  return <ButtonBase {...props} />;
}

export namespace HelpButton {
  export type Props = Button.Props & {
    HelpModal: (props: Modal.Props) => JSX.Element;
  };
}

export function HelpButton(props: HelpButton.Props) {
  const { HelpModal, children, ...rest } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HelpModal show={showModal} hide={() => setShowModal(false)} />
      <Button
        {...rest}
        variant="help"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        {children ?? Loc.Common.Help}
      </Button>
    </>
  );
}

export namespace SubmitButton {
  export type Props = Button.Props & {
    disabledWhenDirty?: boolean;
  };
}

export function SubmitButton({
  disabledWhenDirty = true,
  disabled,
  ...props
}: SubmitButton.Props) {
  const { variant = "primaryGradient", ...rest } = props;

  const { dirty, isSubmitting } = useFormikContext();

  return (
    <Button
      {...rest}
      type="submit"
      variant={variant}
      loading={isSubmitting}
      disabled={disabled || (disabledWhenDirty && !dirty)}
    />
  );
}

export namespace StripePortalButton {
  export type Props = Partial<Button.Props> & {
    tier?: SubscriptionTier;
  };
}

export function StripePortalButton({
  tier,
  children,
  ...rest
}: StripePortalButton.Props) {
  const { user } = useUser();
  const dispatch = useAppDispatch();
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleClick = () => {
    const hasUserSubscribed = !!user?.stripeCustomerId;
    const returnUrl = UrlUtils.url().setPath("/user/dashboard").href;

    if (user && !hasUserSubscribed && tier) {
      setIsRedirecting(true);

      APIFetcher.CreateCheckoutSession({ returnUrl, tier })
        .then((res) => {
          UrlUtils.openInNewTab(res.sessionUrl ?? "");
        })
        .catch((err: CreateCheckoutSessionRequest.Error) => {
          dispatch(Actions.Alert.addErrorAlert({ msg: err.msg }));
        })
        .finally(() => setIsRedirecting(false));
    } else if (user && hasUserSubscribed) {
      setIsRedirecting(true);

      APIFetcher.CreatePortalSession({ returnUrl })
        .then((res) => UrlUtils.openInNewTab(res.sessionUrl ?? ""))
        .catch((err: CreatePortalSessionRequest.Error) => {
          dispatch(Actions.Alert.addErrorAlert({ msg: err.msg }));
        })
        .finally(() => setIsRedirecting(false));
    }
  };

  const defaultChildren =
    user?.subscriptionTier === tier ? "Active" : "Subscribe";

  return (
    <Button
      rightIcon={faChevronsUp}
      onClick={handleClick}
      disabled={user?.subscriptionTier === tier}
      loading={isRedirecting}
      loadingText="Redirecting"
      {...rest}
    >
      {children ?? defaultChildren}
    </Button>
  );
}
