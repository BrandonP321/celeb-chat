import classNames from "classnames";
import React from "react";
import {
  ClassesProp,
  HTMLAnchorProps,
  HTMLButtonProps,
  HTMLProps,
} from "utils/UtilityTypes";
import styles from "./Button.module.scss";
import { Spinner } from "@/Components";

type ButtonHTMLProps = HTMLButtonProps & {
  href?: undefined;
  disabled?: boolean;
};
type AnchorHTMLProps = Omit<HTMLAnchorProps, "href"> & {
  href: string;
  disabled?: undefined;
};
export namespace ButtonBase {
  export type Props = {
    classes?: ClassesProp<"root">;
  };

  export type OwnProps = Omit<ButtonHTMLProps | AnchorHTMLProps, "className"> &
    Props;
}

export function ButtonBase(props: ButtonBase.OwnProps) {
  const { children, classes, ...rest } = props;

  const eleProps: HTMLProps = {
    ...rest,
    className: classNames(styles.btn, classes?.root),
  };

  return !rest.href ? (
    <button {...(eleProps as ButtonHTMLProps)}>{children}</button>
  ) : (
    <a {...(eleProps as AnchorHTMLProps)}>{children}</a>
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
    <ButtonBase {...rest} disabled={disabled ?? loading}>
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
  export type Props = HTMLAnchorProps & {};
}

export function ButtonLink(props: ButtonLink.Props) {
  return <ButtonBase {...props} />;
}
