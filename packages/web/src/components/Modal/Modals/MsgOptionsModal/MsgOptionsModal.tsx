import React from "react";
import styles from "./MsgOptionsModal.module.scss";
import { Modal } from "@/Components";

export namespace MsgOptionsModal {
  export type Props = Modal.Props & {
    msgIndex: number;
  };
}

export function MsgOptionsModal({ msgIndex, ...props }: MsgOptionsModal.Props) {
  return <Modal {...props} classes={{}} title="Message Options"></Modal>;
}
