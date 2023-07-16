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
    required?: boolean;
    maxLength?: number;
    charLimitPostText?: string | React.ReactNode | undefined;
    disabled?: boolean;
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
    required,
    maxLength,
    charLimitPostText,
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
  const fieldLabel = required && !isFocused && !value ? `${label}*` : label;

  const showCharsUsed = maxLength && value?.length >= maxLength * 0.75;
  const hasReachedMaxLength = maxLength && value?.length >= maxLength;

  return (
    <div className={classNames(styles.outerWrapper, classes?.root)}>
      {showCharsUsed && (
        <p className={styles.charsUsedWrapper}>
          <span
            className={classNames(
              styles.chars,
              hasReachedMaxLength && styles.max
            )}
          >
            {value?.length} / {maxLength}
          </span>
          &nbsp;
          {charLimitPostText}
        </p>
      )}
      <div
        className={classNames(
          styles.formFieldWrapper,
          isFocused && styles.focused,
          !value && styles.empty,
          error && styles.error,
          props.disabled && styles.disabled
        )}
      >
        <label
          className={classNames(styles.label, classes?.label)}
          htmlFor={inputId}
        >
          {fieldLabel}
        </label>

        <Field
          {...rest}
          id={inputId}
          name={name}
          onBlur={handleBlur}
          onFocus={handleFocus}
          maxLength={maxLength}
          onChangeCapture={(e: React.ChangeEvent<HTMLInputElement>) =>
            !!onChange && onChange(e.currentTarget.value)
          }
          onLoad={(e: any) => console.log({ e })}
          className={classNames(styles.formField, classes?.input)}
        />

        {error && <p className={styles.errorMsg}>{error}</p>}
        {hintText && <p className={styles.hintText}>{hintText}</p>}
      </div>
    </div>
  );
}

export default FormField;
