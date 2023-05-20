import React from "react";
import styles from "./RequestPasswordReset.module.scss";
import { PageHeader, ScrollablePage } from "@/Components";
import { RequestPasswordResetForm } from "./components/RequestPasswordResetForm/RequestPasswordResetForm";
import { Loc } from "@/Loc";

export namespace RequestPasswordReset {
  export type Props = {};
}

export function RequestPasswordReset(props: RequestPasswordReset.Props) {
  return (
    <ScrollablePage>
      <PageHeader title={Loc.Web.RequestPassReset.PageTitle} />
      <RequestPasswordResetForm />
    </ScrollablePage>
  );
}
