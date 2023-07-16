import React, { useEffect, useState } from "react";
import styles from "./ToolTip.module.scss";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/pro-solid-svg-icons";

export namespace ToolTip {
  export type Props = React.PropsWithChildren<{
    show: boolean;
    setShow: (show: boolean) => void;
  }>;
}

export function ToolTip({ children, show, setShow }: ToolTip.Props) {
  useEffect(() => {
    const handleBodyClick = () => {
      setShow(false);
    };

    document.body.addEventListener("click", handleBodyClick);

    return () => document.body.removeEventListener("click", handleBodyClick);
  }, [setShow]);

  return (
    <div
      className={classNames(styles.tooltip, !show && styles.hide)}
      onClick={() => requestAnimationFrame(() => setShow(true))}
    >
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export namespace ToolTipWrapper {
  export type Props = Omit<ToolTip.Props, "show" | "setShow"> &
    React.PropsWithChildren<{
      tooltipBody: string | React.ReactNode;
      preText?: string | React.ReactNode;
    }>;
}

export function ToolTipWrapper(props: ToolTipWrapper.Props) {
  const { children, tooltipBody, preText, ...rest } = props;

  const [show, setShow] = useState(false);

  const handleClick = () => {
    requestAnimationFrame(() => {
      setShow(!show);
    });
  };

  return (
    <span className={styles.tooltipWrapper}>
      <ToolTip show={show} setShow={setShow}>
        {tooltipBody}
      </ToolTip>
      {preText}
      {preText && " "}
      <button onClick={handleClick}>{children}</button>
    </span>
  );
}

type QuestionIconToolTipProps = React.PropsWithChildren<{
  preText?: string | React.ReactNode;
}>;

export const QuestionIconToolTip = ({
  children,
  preText,
}: QuestionIconToolTipProps) => {
  return (
    <ToolTipWrapper tooltipBody={children} preText={preText}>
      <FontAwesomeIcon
        icon={faQuestionCircle}
        className={styles.questionIcon}
      />
    </ToolTipWrapper>
  );
};
