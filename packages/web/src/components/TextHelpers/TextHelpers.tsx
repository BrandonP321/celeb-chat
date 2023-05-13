import React from "react";
import styles from "./TextHelpers.module.scss";
import classNames from "classnames";

type TextColorHelperProps = React.PropsWithChildren<{
  className?: string;
  customClassName: string;
}>;

type TextColorProps = Omit<TextColorHelperProps, "customClassName">;

function TextColorHelper({
  children,
  customClassName,
  className,
}: TextColorHelperProps) {
  return (
    <span className={classNames(customClassName, className)}>{children}</span>
  );
}

export function TextSecondary(props: TextColorProps) {
  return <TextColorHelper {...props} customClassName={styles.secondary} />;
}

export function TextAccentPrimary(props: TextColorProps) {
  return <TextColorHelper {...props} customClassName={styles.accentPrimary} />;
}

export function TextAccentSecondary(props: TextColorProps) {
  return (
    <TextColorHelper {...props} customClassName={styles.accentSecondary} />
  );
}
