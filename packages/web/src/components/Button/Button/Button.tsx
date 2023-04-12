import classNames from "classnames";
import React from "react";
import {
  ClassesProp,
  HTMLAnchorProps,
  HTMLButtonProps,
  HTMLProps,
} from "utils/UtilityTypes";
import styles from "./Button.module.scss";

type ButtonHTMLProps = HTMLButtonProps & {
  href?: undefined;
};
type AnchorHTMLProps = Omit<HTMLAnchorProps, "href"> & {
  href: string;
};
namespace Button {
  export type Props = Omit<ButtonHTMLProps | AnchorHTMLProps, "className"> & {
    classes?: ClassesProp<"root">;
  };
}

function Button(props: Button.Props) {
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

export default Button;
