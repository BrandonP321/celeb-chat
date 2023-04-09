import { FormikHelpers, FormikProps } from "formik";
import React from "react";

export type ClassesProp<Classes extends string> = {
  [key in Classes]?: string;
};

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type FormikSubmit<Values extends {}> = (
  values: Values,
  formik: FormikHelpers<Values>
) => Promise<void>;
