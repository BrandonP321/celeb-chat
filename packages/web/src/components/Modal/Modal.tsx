import React from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";

namespace Modal {
  export type Props = React.PropsWithChildren<{
    show: boolean;
    hide: () => void;
  }>;
}

function Modal(props: Modal.Props) {
  const { children, show, hide } = props;

  return (
    <div className={classNames(styles.modal, !show && styles.hidden)}>
      <div className={styles.pageOverlay} onClick={hide} />
      <div className={styles.modalContentWrapper}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.exitIcon}
          onClick={hide}
        />
        {children}
      </div>
    </div>
  );
}

export default Modal;
