import classNames from "classnames";
import React from "react";
import {
  ClassesProp,
  HTMLLinkProps,
  HTMLButtonProps,
  HTMLProps,
} from "utils/UtilityTypes";
import styles from "./Button.module.scss";
import { Spinner } from "@/Components";
import { Link } from "react-router-dom";

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
    variant?:
      | "primary"
      | "primaryGradient"
      | "secondary"
      | "secondaryGradient"
      | "danger"
      | "black";
  }>;

  export type OwnProps = Omit<ButtonHTMLProps | LinkHTMLProps, "className"> &
    Props;
}

export function ButtonBase(props: ButtonBase.OwnProps) {
  const { children, classes, variant = "primary", ...rest } = props;

  const eleProps: HTMLProps = {
    ...rest,
    className: classNames(styles.btn, classes?.root, styles[variant]),
  };

  return !rest.to ? (
    <button {...(eleProps as ButtonHTMLProps)}>
      <div className={styles.btnBg} />
      <span>{children}</span>
    </button>
  ) : (
    <Link {...(eleProps as LinkHTMLProps)}>
      <div className={styles.btnBg} />
      <span>{children}</span>
    </Link>
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
  const { disabled, loading, loadingText, children, ...rest } = props;

  return (
    <ButtonBase {...rest} disabled={disabled || loading}>
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
