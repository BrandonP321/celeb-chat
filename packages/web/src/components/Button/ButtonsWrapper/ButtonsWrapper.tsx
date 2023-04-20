import React from "react";
import styles from "./ButtonsWrapper.module.scss";
import classNames from "classnames";

export enum BtnAlign {
  Top = "top",
  Left = "left",
  Right = "right",
  Bottom = "bottom",
}

const btnAlignClassMap = {
  [BtnAlign.Top]: styles.alignTop,
  [BtnAlign.Left]: styles.alignLeft,
  [BtnAlign.Right]: styles.alignRight,
  [BtnAlign.Bottom]: styles.alignBottom,
};

namespace ButtonsWrapper {
  export type Props = React.PropsWithChildren<{
    align?: BtnAlign;
    className?: string;
  }>;
}

function ButtonsWrapper(props: ButtonsWrapper.Props) {
  const { align = BtnAlign.Right, children, className } = props;

  return (
    <div
      className={classNames(
        styles.btnsWrapper,
        btnAlignClassMap[align],
        className
      )}
    >
      {children}
    </div>
  );
}

export default ButtonsWrapper;
