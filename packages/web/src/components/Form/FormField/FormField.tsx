import React, { useRef, useState } from "react";
import styles from "./FormField.module.scss";
import { ClassesProp } from "utils/UtilityTypes";
import classNames from "classnames";
import { Field, useFormikContext } from "formik";

namespace FormField {
  export type Props = React.PropsWithChildren<{
    label?: string;
    name: string;
    classes?: ClassesProp<"root" | "label" | "error" | "input">;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: string) => void;
    hintText?: string;
    as?: "input" | "select" | "textarea";
    initialValue?: string;
    id?: string;
  }>;
}

function FormField(props: FormField.Props) {
  const {
    classes,
    label,
    onFocus,
    onBlur,
    onChange,
    children,
    hintText,
    name,
    id,
    ...rest
  } = props;

  const { values, errors } = useFormikContext<{ [key: string]: string }>();

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
    onFocus && onFocus();
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur && onBlur();
  };

  const value = values[name];
  const error = errors[name];
  const inputId = id ?? name;

  return (
    <div
      className={classNames(
        styles.formFieldWrapper,
        classes?.root,
        isFocused && styles.focused,
        !value && styles.empty,
        error && styles.error
      )}
    >
      <label
        className={classNames(styles.label, classes?.label)}
        htmlFor={inputId}
      >
        {label}
      </label>

      <Field
        {...rest}
        id={inputId}
        name={name}
        onBlur={handleBlur}
        onFocus={handleFocus}
        onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
          !!onChange && onChange(e.currentTarget.value)
        }
        onLoad={(e: any) => console.log({ e })}
        className={classNames(styles.formField, classes?.input)}
      />

      {error && <p className={styles.errorMsg}>{error}</p>}
      {hintText && <p className={styles.hintText}>{hintText}</p>}
    </div>
  );
}

export default FormField;
