import React from "react";
import styles from "./Home.module.scss";
import { StartChatForm } from "./components/StartChatForm/StartChatForm";

export namespace Home {
  export type Props = {};
}

export function Home(props: Home.Props) {
  return (
    <div className={styles.home}>
      <h1 className={styles.pageTitle}>Welcome to XYZ</h1>
      <StartChatForm />
    </div>
  );
}
