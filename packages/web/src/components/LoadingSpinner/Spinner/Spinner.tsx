import React from "react";
import styles from "./Spinner.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";

namespace Spinner {
  export type Props = {
    classes?: ClassesProp<"root">;
  };
}

function Spinner(props: Spinner.Props) {
  const { classes } = props;

  return (
    <FontAwesomeIcon
      icon={faSpinnerThird}
      className={classNames(styles.spinner, classes?.root)}
    />
  );
}

export default Spinner;
