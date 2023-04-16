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
    as?: "input" | "select" | "textarea";
    initialValue?: string;
    id?: string;
  }>;
}

function FormField(props: FormField.Props) {
  const { classes, label, onFocus, onBlur, children, name, id, ...rest } =
    props;

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
        onLoad={(e: any) => console.log({ e })}
        className={classNames(styles.formField, classes?.input)}
      />
      {error && <p className={styles.errorMsg}>{error}</p>}
    </div>
  );
}

export default FormField;