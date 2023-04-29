import React, { useCallback, useEffect } from "react";
import styles from "./Toast.module.scss";
import { Alert, AlertType } from "@/Slices/Alerts/AlertsSlice";
import { useAppDispatch } from "@/Hooks";
import classNames from "classnames";
import { Actions } from "@/Slices";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/pro-solid-svg-icons";
import { ClassesProp } from "utils/UtilityTypes";

export namespace Toast {
  export type Props = Alert & {
    index: number;
    classes?: ClassesProp<"root">;
  };
}

const toastClassNameMap = {
  [AlertType.Error]: styles.error,
  [AlertType.Info]: styles.info,
  [AlertType.Success]: styles.success,
};

export function Toast({ index, msg, type, isDismissed, classes }: Toast.Props) {
  const dispatch = useAppDispatch();

  const timeToDismiss = 5000;

  const dismiss = useCallback(() => {
    dispatch(Actions.Alert.dismissAlert({ alertIndex: index }));
  }, [dispatch, index]);

  useEffect(() => {
    setTimeout(dismiss, timeToDismiss);
  }, [dismiss]);

  return (
    <div
      className={classNames(
        styles.toast,
        isDismissed && styles.dismissed,
        toastClassNameMap[type]
      )}
    >
      <button onClick={dismiss} className={styles.dismissBtn}>
        <FontAwesomeIcon icon={faX} className={styles.icon} />
      </button>
      {msg}
    </div>
  );
}
