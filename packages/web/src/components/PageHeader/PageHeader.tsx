import React from "react";
import styles from "./PageHeader.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";

export namespace PageHeader {
  export type Props = {
    title: string;
    desc?: string | React.ReactElement;
    classes?: ClassesProp<"root" | "title" | "desc">;
    alignTitleLeft?: boolean;
  };
}

export function PageHeader({
  title,
  desc,
  classes,
  alignTitleLeft,
}: PageHeader.Props) {
  return (
    <div
      className={classNames(
        styles.header,
        classes?.root,
        alignTitleLeft && styles.alignLeft
      )}
    >
      <h1 className={classNames(classes?.title)}>{title}</h1>
      <p className={classNames(classes?.desc)}>{desc}</p>
    </div>
  );
}
