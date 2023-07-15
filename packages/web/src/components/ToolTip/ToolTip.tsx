import React, { useState } from "react";
import styles from "./ToolTip.module.scss";
import classNames from "classnames";

export namespace ToolTip {
  export type Props = React.PropsWithChildren<{
    show: boolean;
  }>;
}

export function ToolTip({ children, show }: ToolTip.Props) {
  return (
    <div className={classNames(styles.tooltip, !show && styles.hide)}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export namespace ToolTipWrapper {
  export type Props = Omit<ToolTip.Props, "show"> &
    React.PropsWithChildren<{
      tooltipBody: string | React.ReactNode;
    }>;
}

export function ToolTipWrapper(props: ToolTipWrapper.Props) {
  const { children, tooltipBody, ...rest } = props;

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <span className={styles.tooltipWrapper}>
      <ToolTip show={show}>{tooltipBody}</ToolTip>
      <button onClick={handleClick}>{children}</button>
    </span>
  );
}

type QuestionIconToolTipProps = React.PropsWithChildren<{}>;

export const QuestionIconToolTip = ({ children }: QuestionIconToolTipProps) => {
  return <ToolTipWrapper tooltipBody={children}>?</ToolTipWrapper>;
};
