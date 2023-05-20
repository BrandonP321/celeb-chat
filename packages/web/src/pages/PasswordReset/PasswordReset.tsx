import React from "react";
import styles from "./PasswordReset.module.scss";
import { PageHeader, ScrollablePage } from "@/Components";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { Loc } from "@/Loc";

export namespace PasswordReset {
  export type Props = {};
}

export function PasswordReset(props: PasswordReset.Props) {
  return (
    <ScrollablePage>
      <PageHeader title={Loc.Web.PassReset.PageTitle} />
      <PasswordResetForm />
    </ScrollablePage>
  );
}
