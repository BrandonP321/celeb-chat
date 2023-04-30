import React from "react";
import { Button, ButtonsWrapper, Modal } from "@/Components";
import styles from "./SaveModal.module.scss";
import { useFormikContext } from "formik";

namespace SaveModal {
  export type Props = Modal.Props & {
    title?: string;
    saveBtnText?: string;
    savingBtnText?: string;
    saveBtnVariant?: Button.Props["variant"];
    saving?: boolean;
    onSave?: () => void;
    cancelBtnText?: string;
    cancelBtnVariant?: Button.Props["variant"];
    onCancel?: () => void;
  };
}

function SaveModal(props: SaveModal.Props) {
  const {
    title,
    saveBtnText = "Save",
    savingBtnText = "Saving",
    saveBtnVariant = "primary",
    saving,
    onSave,
    cancelBtnText = "Cancel",
    cancelBtnVariant = "danger",
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
          <Button onClick={handleCancel} variant={cancelBtnVariant}>
            {cancelBtnText}
          </Button>
          <Button
            onClick={onSave}
            loading={saving}
            loadingText={savingBtnText}
            variant={saveBtnVariant}
          >
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
