import React from "react";
import styles from "./FormHelpers.module.scss";

export namespace FormWarningMsg {
  export type Props = React.PropsWithChildren<{}>;
}

export function FormWarningMsg({ children }: FormWarningMsg.Props) {
  return <p className={styles.warningMsg}>{children}</p>;
}
