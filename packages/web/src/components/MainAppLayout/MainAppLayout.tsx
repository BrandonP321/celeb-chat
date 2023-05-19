import React from "react";
import styles from "./MainAppLayout.module.scss";
import { AlertToasts } from "..";
import { Outlet } from "react-router-dom";

export namespace MainAppLayout {
  export type Props = {};
}

export function MainAppLayout(props: MainAppLayout.Props) {
  return (
    <div className={styles.layout}>
      <AlertToasts />
      <Outlet />
    </div>
  );
}
