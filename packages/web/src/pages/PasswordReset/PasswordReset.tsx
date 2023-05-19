import React from "react";
import styles from "./PasswordReset.module.scss";
import { PageHeader, ScrollablePage } from "@/Components";
import { PasswordResetForm } from "./components/PasswordResetForm";

export namespace PasswordReset {
  export type Props = {};
}

export function PasswordReset(props: PasswordReset.Props) {
  return (
    <ScrollablePage>
      <PageHeader title="Reset Password" />
      <PasswordResetForm />
    </ScrollablePage>
  );
}
