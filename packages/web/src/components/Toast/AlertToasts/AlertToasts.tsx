import React, { useEffect } from "react";
import styles from "./AlertToasts.module.scss";
import { useAlerts } from "@/Hooks";
import { Toast } from "@/Components";

export namespace AlertToasts {
  export type Props = {};
}

export function AlertToasts(props: AlertToasts.Props) {
  const { alerts } = useAlerts();

  return (
    <div className={styles.alerts}>
      {alerts?.map((a, i) => (
        <Toast {...a} key={i} index={i} />
      ))}
    </div>
  );
}
