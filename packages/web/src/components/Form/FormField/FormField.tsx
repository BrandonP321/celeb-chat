import React, { useState } from "react";
import styles from "./FormField.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import { Field, FieldProps } from "formik";

namespace FormField {
  export type Props = React.PropsWithChildren<{
    error?: string;
    label?: string;
    name: string;
    classes?: ClassesProp<"root" | "label" | "error" | "input">;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: string) => void;
    as?: "input" | "select" | "textarea";
  }>;
}

function FormField(props: FormField.Props) {
  const {
    classes,
    error,
    label,
    onFocus,
    onBlur,
    onChange,
    children,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const handleChange = (value: string) => {
    setIsEmpty(!value);
    onChange && onChange(value);
  };

  return (
    <div
      className={classNames(
        styles.formFieldWrapper,
        classes?.root,
        isFocused && styles.focused,
        isEmpty && styles.empty,
        error && styles.error
      )}
    >
      <label className={classNames(styles.label, classes?.label)}>
        {label}
      </label>

      <Field
        {...rest}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.currentTarget.value)
        }
        className={classNames(styles.formField, classes?.input)}
      />

      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

export default FormField;
