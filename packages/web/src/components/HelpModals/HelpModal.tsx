import React from "react";
import styles from "./HelpModal.module.scss";
import { Modal } from "@/Components";

export namespace HelpModal {
  export type Props = Omit<Modal.Props, "classes"> & {};
}

/** Exists as it's own component because of the unique styling that gets applied */
export function HelpModal(props: HelpModal.Props) {
  return <Modal {...props} classes={{ content: styles.modalContent }} />;
}
