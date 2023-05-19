import classNames from "classnames";
import React, { useState } from "react";
import {
  ClassesProp,
  HTMLLinkProps,
  HTMLButtonProps,
  HTMLProps,
} from "utils/UtilityTypes";
import styles from "./Button.module.scss";
import { Modal, Spinner } from "@/Components";
import { Link } from "react-router-dom";
import { useFormikContext } from "formik";

type ButtonHTMLProps = HTMLButtonProps & {
  to?: undefined;
  disabled?: boolean;
};
type LinkHTMLProps = Omit<HTMLLinkProps, "href"> & {
  to: string;
  disabled?: undefined;
};

export namespace ButtonBase {
  export type Props = React.PropsWithChildren<{
    classes?: ClassesProp<"root">;
    variant?:
      | "primary"
      | "primaryGradient"
      | "secondary"
      | "secondaryGradient"
      | "danger"
      | "black"
      | "help";
  }>;

  export type OwnProps = Omit<ButtonHTMLProps | LinkHTMLProps, "className"> &
    Props;
}

export function ButtonBase(props: ButtonBase.OwnProps) {
  const { children, classes, variant = "primary", ...rest } = props;

  const eleProps: HTMLProps = {
    ...rest,
    className: classNames(styles.btn, classes?.root, styles[variant]),
  };

  return !rest.to ? (
    <button {...(eleProps as ButtonHTMLProps)}>
      <div className={styles.btnBg} />
      <span>{children}</span>
    </button>
  ) : (
    <Link {...(eleProps as LinkHTMLProps)}>
      <div className={styles.btnBg} />
      <span>{children}</span>
    </Link>
  );
}

export namespace Button {
  export type Props = HTMLButtonProps &
    ButtonBase.Props & {
      loading?: boolean;
      loadingText?: string;
    };
}

export function Button(props: Button.Props) {
  const { disabled, loading, loadingText, children, type, ...rest } = props;

  return (
    <ButtonBase
      {...rest}
      type={type ?? "button"}
      disabled={disabled || loading}
    >
      {loading ? (
        <span>
          <Spinner classes={{ root: styles.spinner }} />
          {loadingText && <span>&nbsp;{loadingText}</span>}
        </span>
      ) : (
        children
      )}
    </ButtonBase>
  );
}

export namespace ButtonLink {
  export type Props = LinkHTMLProps & ButtonBase.Props & {};
}

export function ButtonLink(props: ButtonLink.Props) {
  return <ButtonBase {...props} />;
}

export namespace HelpButton {
  export type Props = Button.Props & {
    HelpModal: (props: Modal.Props) => JSX.Element;
  };
}

export function HelpButton(props: HelpButton.Props) {
  const { HelpModal, children, ...rest } = props;

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <HelpModal show={showModal} hide={() => setShowModal(false)} />
      <Button
        {...rest}
        variant="help"
        onClick={(e) => {
          e.preventDefault();
          setShowModal(true);
        }}
      >
        {children ?? "Help"}
      </Button>
    </>
  );
}

export function SubmitButton(props: Button.Props) {
  const { variant = "primaryGradient", ...rest } = props;

  const { dirty, isSubmitting } = useFormikContext();

  return (
    <Button
      {...rest}
      type="submit"
      variant={variant}
      loading={isSubmitting}
      disabled={!dirty}
    />
  );
}
