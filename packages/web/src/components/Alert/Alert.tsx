import React from "react";
import styles from "./Alert.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import {
  faCircleCheck,
  faCircleInfo,
  faCircleXmark,
} from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export namespace Alert {
  export type Props = React.PropsWithChildren<{
    type?: "info" | "warning" | "success";
    classes?: ClassesProp<"root" | "icon" | "contentWrapper">;
    title?: string;
  }>;
}

export function Alert(props: Alert.Props) {
  const { type = "info", classes, children, title } = props;

  const iconMap = {
    info: faCircleInfo,
    warning: faCircleXmark,
    success: faCircleCheck,
  } as const;

  return (
    <div className={classNames(styles.alert, styles[type], classes?.root)}>
      <FontAwesomeIcon
        className={classNames(styles.icon, classes?.icon)}
        icon={iconMap[type]}
      />
      <div
        className={classNames(styles.contentWrapper, classes?.contentWrapper)}
      >
        <p className={styles.title}>{title}</p>
        {children}
      </div>
    </div>
  );
}
