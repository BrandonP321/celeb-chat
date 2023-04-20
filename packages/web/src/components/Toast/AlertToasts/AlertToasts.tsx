import React, { useEffect } from "react";
import styles from "./AlertToasts.module.scss";
import { useAlerts, useAppDispatch } from "@/Hooks";
import { Toast } from "@/Components";
import { useLocation } from "react-router-dom";
import { Actions } from "@/Slices";

export namespace AlertToasts {
  export type Props = {};
}

export function AlertToasts(props: AlertToasts.Props) {
  const { alerts } = useAlerts();
  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(Actions.Alert.dismissAllAlerts());
  }, [dispatch, location]);

  return (
    <div className={styles.alerts}>
      {alerts?.map((a, i) => (
        <Toast {...a} key={i} index={i} />
      ))}
    </div>
  );
}
