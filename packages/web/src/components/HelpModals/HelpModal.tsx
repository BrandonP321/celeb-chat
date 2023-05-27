import React from "react";
import styles from "./HelpModal.module.scss";
import { Button, ButtonsWrapper, Modal } from "@/Components";

export namespace HelpModal {
  export type Props = Omit<Modal.Props, "classes"> & {};
}

/** Exists as it's own component because of the unique styling that gets applied */
export function HelpModal(props: HelpModal.Props) {
  const Footer = () => (
    <ButtonsWrapper>
      <Button onClick={props.hide}>Got it!</Button>
    </ButtonsWrapper>
  );

  return (
    <Modal
      {...props}
      classes={{ content: styles.modalContent }}
      footerContent={Footer}
    />
  );
}
