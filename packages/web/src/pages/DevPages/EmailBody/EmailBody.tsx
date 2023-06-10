import React from "react";
import styles from "./EmailBody.module.scss";
import { Outlet } from "react-router-dom";

export namespace EmailBody {
  export type Props = React.PropsWithChildren<{}>;
}

export function EmailBody({ children }: EmailBody.Props) {
  return (
    <div className={styles.body}>
      <Outlet />
    </div>
  );
}
