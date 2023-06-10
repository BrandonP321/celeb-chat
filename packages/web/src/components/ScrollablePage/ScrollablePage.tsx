import React from "react";
import styles from "./ScrollablePage.module.scss";
import classNames from "classnames";

export namespace ScrollablePage {
  export type Props = React.PropsWithChildren<{
    className?: string;
  }>;
}

export function ScrollablePage({ children, className }: ScrollablePage.Props) {
  return (
    <div className={styles.page}>
      <div className={classNames(styles.content, className)}>{children}</div>
    </div>
  );
}
