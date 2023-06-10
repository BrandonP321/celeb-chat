import React from "react";
import styles from "./ActionIcon.module.scss";
import { Button, ButtonLink } from "@/Components";
import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ClassesProp } from "utils/UtilityTypes";

type ActionIconProps = {
  icon: FontAwesomeIconProps["icon"];
  classes: ClassesProp<"root" | "icon">;
};

export namespace ActionIcon {
  export type Props = Button.Props & ActionIconProps;
}

export function ActionIcon(props: ActionIcon.Props) {
  const { classes, icon, ...rest } = props;

  return (
    <Button
      {...rest}
      classes={{ ...classes, root: classNames(styles.iconBtn, classes?.root) }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={classNames(styles.icon, classes?.icon)}
      />
    </Button>
  );
}

export namespace ActionIconLink {
  export type Props = ButtonLink.Props & ActionIconProps;
}

export function ActionIconLink(props: ActionIconLink.Props) {
  const { classes, icon, ...rest } = props;

  return (
    <ButtonLink
      {...rest}
      classes={{ ...classes, root: classNames(styles.iconBtn, classes?.root) }}
    >
      <FontAwesomeIcon
        icon={icon}
        className={classNames(styles.icon, classes?.icon)}
      />
    </ButtonLink>
  );
}
