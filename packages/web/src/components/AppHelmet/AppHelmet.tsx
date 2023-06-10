import React from "react";
import { Loc } from "@/Loc";
import { Helmet } from "react-helmet-async";

// TODO: Add keywords
type PageMetaData = {
  title: string;
  desc: string;
  image: string;
};

const defaultMetaData: PageMetaData = {
  title: Loc.Web.Meta.Title,
  desc: Loc.Web.Meta.Desc,
  // TODO: Update image
  image: "https://i.imgur.com/RNeSEhF.png",
};

export namespace AppHelmet {
  export type Props = Partial<PageMetaData> & {};
}

export function AppHelmet(props: AppHelmet.Props) {
  const { ...rest } = props;

  const meta = {
    ...defaultMetaData,
    ...rest,
  };

  return (
    <Helmet prioritizeSeoTags>
      <title>{meta.title}</title>
      <meta name="description" content={meta.desc} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:image" content={meta.image} />
    </Helmet>
  );
}
