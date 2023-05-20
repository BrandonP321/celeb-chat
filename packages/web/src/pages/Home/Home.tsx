import React from "react";
import styles from "./Home.module.scss";
import { StartChatForm } from "./components/StartChatForm/StartChatForm";
import { Loc } from "@/Loc";

export namespace Home {
  export type Props = {};
}

export function Home(props: Home.Props) {
  return (
    <div className={styles.home}>
      <h1 className={styles.pageTitle}>{Loc.Web.Home.Title}</h1>
      <StartChatForm />
    </div>
  );
}
