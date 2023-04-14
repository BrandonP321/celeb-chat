import React from "react";
import { Button, ButtonsWrapper, Modal } from "@/Components";
import styles from "./SaveModal.module.scss";
import { useFormikContext } from "formik";

namespace SaveModal {
  export type Props = Modal.Props & {
    title?: string;
    saveBtnText?: string;
    onSave?: () => void;
    cancelBtnText?: string;
    onCancel?: () => void;
  };
}

function SaveModal(props: SaveModal.Props) {
  const {
    title,
    saveBtnText = "Save",
    onSave,
    cancelBtnText = "Cancel",
    onCancel,
    children,
    hide,
    ...rest
  } = props;

  const { resetForm, submitForm } = useFormikContext<{
    [key: string]: string;
  }>();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      resetForm();
    }

    hide();
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      submitForm();
    }
  };

  return (
    <Modal {...rest} hide={hide}>
      <div className={styles.modalContent}>
        <div className={styles.upperContent}>
          <h3 className={styles.modalTitle}>{title}</h3>
          {children}
        </div>
        <ButtonsWrapper>
          <Button onClick={handleCancel}>{cancelBtnText}</Button>
          <Button onClick={handleSave}>{saveBtnText}</Button>
        </ButtonsWrapper>
      </div>
    </Modal>
  );
}

export default SaveModal;
