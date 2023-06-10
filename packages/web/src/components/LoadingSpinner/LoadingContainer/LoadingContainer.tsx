import React from "react";
import styles from "./LoadingContainer.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import { Spinner } from "@/Components";

namespace LoadingContainer {
  export type Props = {
    loading?: boolean;
    classes?: ClassesProp<"root" | "loadingText">;
    loadingText?: string;
  };
}

function LoadingContainer(props: LoadingContainer.Props) {
  const { classes, loading = true, loadingText } = props;

  return (
    <div
      className={classNames(
        styles.loadingContainer,
        classes?.root,
        loading && styles.loading
      )}
    >
      <Spinner />
      {loadingText && (
        <p className={classNames(styles.loadingText, classes?.loadingText)}>
          {loadingText}
        </p>
      )}
    </div>
  );
}

export default LoadingContainer;
