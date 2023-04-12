import React from "react";
import styles from "./ButtonsWrapper.module.scss";
import classNames from "classnames";
import { ClassesProp } from "utils/UtilityTypes";

namespace ButtonsWrapper {
  export type Props = React.PropsWithChildren<{
    alignLeft?: boolean;
    className?: string;
  }>;
}

function ButtonsWrapper(props: ButtonsWrapper.Props) {
  const { alignLeft, children, className } = props;

  return (
    <div
      className={classNames(
        styles.btnsWrapper,
        alignLeft && styles.alignLeft,
        className
      )}
    >
      {children}
    </div>
  );
}

export default ButtonsWrapper;
