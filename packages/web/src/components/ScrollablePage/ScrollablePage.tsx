import React from "react";
import styles from "./ScrollablePage.module.scss";
import classNames from "classnames";
import { MainFooter } from "..";

export namespace ScrollablePage {
  export type Props = React.PropsWithChildren<{
    className?: string;
    withFooter?: boolean;
  }>;
}

export function ScrollablePage({
  children,
  className,
  withFooter = true,
}: ScrollablePage.Props) {
  return (
    <div className={styles.page}>
      <div className={classNames(styles.content, className)}>{children}</div>
      {withFooter && <MainFooter />}
    </div>
  );
}
