import React from "react";
import styles from "./PageHeader.module.scss";

export namespace PageHeader {
  export type Props = {
    title: string;
    desc?: string;
  };
}

export function PageHeader({ title, desc }: PageHeader.Props) {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <p>{desc}</p>
    </div>
  );
}
