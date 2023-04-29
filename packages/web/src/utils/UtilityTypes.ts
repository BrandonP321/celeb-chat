import { FormikHelpers, FormikProps } from "formik";
import React from "react";
import { LinkProps } from "react-router-dom";

export type SomeRequired<T extends {}, TFields extends keyof T> = Omit<
  T,
  TFields
> &
  Required<Pick<T, TFields>>;

export type ClassesProp<Classes extends string> = {
  [key in Classes]?: string;
};

export type HTMLInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export type HTMLProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
>;

export type HTMLButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export type HTMLAnchorProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type HTMLLinkProps = LinkProps & React.RefAttributes<HTMLAnchorElement>;

export type FormikSubmit<Values extends {}> = (
  values: Values,
  formik: FormikHelpers<Values>
) => Promise<any>;

export type FormikStringValues<Fields extends string> = {
  [key in Fields]: string;
};
