import React from "react";
import styles from "./RequestPasswordReset.module.scss";
import { AppHelmet, PageHeader, ScrollablePage } from "@/Components";
import { RequestPasswordResetForm } from "./components/RequestPasswordResetForm/RequestPasswordResetForm";
import { Loc } from "@/Loc";

export namespace RequestPasswordReset {
  export type Props = {};
}

export function RequestPasswordReset(props: RequestPasswordReset.Props) {
  return (
    <ScrollablePage>
      <AppHelmet title={Loc.Web.RequestPassReset.Meta.Title} />
      <PageHeader
        title={Loc.Web.RequestPassReset.PageTitle}
        desc={Loc.Web.RequestPassReset.PageBlurb}
      />
      <RequestPasswordResetForm />
    </ScrollablePage>
  );
}
