import React from "react";
import { Button, ButtonsWrapper, Modal } from "@/Components";
import styles from "./SaveModal.module.scss";
import { useFormikContext } from "formik";

namespace SaveModal {
  export type Props = Modal.Props & {
    title?: string;
    saveBtnText?: string;
    savingBtnText?: string;
    saving?: boolean;
    onSave?: () => void;
    cancelBtnText?: string;
    onCancel?: () => void;
  };
}

function SaveModal(props: SaveModal.Props) {
  const {
    title,
    saveBtnText = "Save",
    savingBtnText = "Saving",
    saving,
    onSave,
    cancelBtnText = "Cancel",
    onCancel,
    children,
    hide,
    ...rest
  } = props;

  const handleCancel = () => {
    onCancel && onCancel();
    hide();
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
          <Button onClick={onSave} loading={saving} loadingText={savingBtnText}>
            {saveBtnText}
          </Button>
        </ButtonsWrapper>
      </div>
    </Modal>
  );
}

export namespace FormikSaveModal {
  export type Props = SaveModal.Props & {};
}

export function FormikSaveModal(props: FormikSaveModal.Props) {
  const { onCancel, onSave, ...rest } = props;

  const { resetForm, submitForm } = useFormikContext<{
    [key: string]: string;
  }>();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      resetForm();
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave();
    } else {
      submitForm();
    }
  };

  return <SaveModal {...rest} onSave={handleSave} onCancel={handleCancel} />;
}

export default SaveModal;
