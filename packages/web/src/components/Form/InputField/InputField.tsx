import React from "react";
import styles from "./InputField.module.scss";
import { FormField } from "@/Components";
import { ClassesProp, HTMLInputProps } from "@/Utils";
import { Form, Formik } from "formik";
import classNames from "classnames";

namespace InputField {
  export type Props = Omit<HTMLInputProps, "className" | "onChange"> &
    Omit<FormField.Props, "as"> & {};
}

function InputField(props: InputField.Props) {
  return <FormField {...props} />;
}

export namespace StandaloneInputField {
  export type Props = Omit<InputField.Props, "classes"> & {
    classes?: InputField.Props["classes"] & ClassesProp<"form">;
  };
}

export function StandaloneInputField(props: StandaloneInputField.Props) {
  return (
    <Formik initialValues={{ [props.name]: "" }} onSubmit={() => {}}>
      <Form className={classNames(styles.standaloneForm, props.classes?.form)}>
        <InputField {...props} />
      </Form>
    </Formik>
  );
}

export default InputField;
