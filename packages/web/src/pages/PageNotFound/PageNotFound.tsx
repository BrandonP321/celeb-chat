import React from "react";
import styles from "./PageNotFound.module.scss";
import {
  ButtonLink,
  ButtonsWrapper,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { Loc } from "@/Loc";
import { faHome } from "@fortawesome/pro-solid-svg-icons";

export namespace PageNotFound {
  export type Props = {};
}

export function PageNotFound(props: PageNotFound.Props) {
  return (
    <ScrollablePage className={styles.page}>
      <PageHeader
        title={Loc.Web.PageNotFound.PageTitle}
        desc={Loc.Web.PageNotFound.PageDesc}
      />
      <ButtonsWrapper>
        <ButtonLink to={"/"} rightIcon={faHome}>
          {Loc.Web.PageNotFound.CTA}
        </ButtonLink>
      </ButtonsWrapper>
    </ScrollablePage>
  );
}
