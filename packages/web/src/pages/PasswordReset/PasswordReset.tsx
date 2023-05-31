import React from "react";
import styles from "./PasswordReset.module.scss";
import { AppHelmet, PageHeader, ScrollablePage } from "@/Components";
import { PasswordResetForm } from "./components/PasswordResetForm";
import { Loc } from "@/Loc";

export namespace PasswordReset {
  export type Props = {};
}

export function PasswordReset(props: PasswordReset.Props) {
  return (
    <ScrollablePage>
      <AppHelmet title={Loc.Web.PassReset.Meta.Title} />
      <PageHeader
        title={Loc.Web.PassReset.PageTitle}
        desc={Loc.Web.PassReset.PageBlurb}
      />
      <PasswordResetForm />
    </ScrollablePage>
  );
}
