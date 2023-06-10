import React from "react";
import styles from "./Modal.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-solid-svg-icons";
import { ClassesProp } from "utils/UtilityTypes";

namespace Modal {
  export type Props = React.PropsWithChildren<{
    show: boolean;
    hide: () => void;
    classes?: ClassesProp<"root" | "content" | "upperContent">;
    footerContent?: () => JSX.Element;
    title?: React.ReactElement | string;
  }>;
}

function Modal(props: Modal.Props) {
  const { children, show, hide, classes, title, footerContent: Footer } = props;

  return (
    <div
      className={classNames(
        styles.modal,
        classes?.root,
        !show && styles.hidden
      )}
    >
      <div className={styles.pageOverlay} onClick={hide} />
      <div className={classNames(styles.modalContentWrapper, classes?.content)}>
        <FontAwesomeIcon
          icon={faXmark}
          className={styles.exitIcon}
          onClick={hide}
        />
        <div className={styles.scrollWrapper}>
          <div
            className={classNames(styles.upperContent, classes?.upperContent)}
          >
            <h3 className={styles.modalTitle}>{title}</h3>
            {children}
          </div>

          {Footer && <Footer />}
        </div>
      </div>
    </div>
  );
}

export default Modal;
