import React from "react";
import { Button, ButtonsWrapper, Modal } from "@/Components";
import styles from "./SaveModal.module.scss";
import { useFormikContext } from "formik";
import { Loc } from "@/Loc";

namespace SaveModal {
  export type Props = Modal.Props & {
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
    saveBtnText = Loc.Common.Save,
    savingBtnText = Loc.Common.Saving,
    saveBtnVariant = "primary",
    saving,
    onSave,
    cancelBtnText = Loc.Common.Cancel,
    cancelBtnVariant = "danger",
    onCancel,
    children,
    hide,
    classes = {},
    ...rest
  } = props;

  const handleCancel = () => {
    onCancel && onCancel();
    hide();
  };

  const Footer = () => (
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
  );

  return (
    <Modal
      {...rest}
      classes={{ ...classes, upperContent: styles.upperContent }}
      hide={hide}
      footerContent={Footer}
    >
      {children}
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
