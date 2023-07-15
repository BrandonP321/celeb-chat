import React, { useState } from "react";
import styles from "./Sheen.module.scss";
import { ClassesProp } from "@/Utils";
import classNames from "classnames";

export namespace Sheen {
  export type Props = {
    classes?: ClassesProp<"root">;
    /** Animation duration in seconds */
    duration?: number;
    hideOnHover?: boolean;
  };
}

export function Sheen(props: Sheen.Props) {
  const { classes, duration, hideOnHover } = props;

  const [show, setShow] = useState(true);

  const handleHover = () => {
    if (show && hideOnHover) {
      setShow(false);
    }
  };

  return (
    <div
      className={classNames(
        styles.sheenWrapper,
        hideOnHover && styles.hideOnHover,
        !show && styles.hide,
        classes?.root
      )}
      onMouseOver={show ? handleHover : undefined}
    >
      <div
        className={styles.sheen}
        style={{ animationDuration: duration ? `${duration}s` : undefined }}
      />
    </div>
  );
}
