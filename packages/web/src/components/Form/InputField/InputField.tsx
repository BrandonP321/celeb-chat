import React from "react";
import styles from "./InputField.module.scss";
import { FormField } from "@/Components";
import { HTMLInputProps } from "@/Utils";

namespace InputField {
  export type Props = Omit<HTMLInputProps, "className"> &
    Omit<FormField.Props, "as"> & {};
}

function InputField(props: InputField.Props) {
  return <FormField {...props} />;
}

export default InputField;
