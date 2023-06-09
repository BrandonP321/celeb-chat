import React from "react";
import { Loc } from "@/Loc";
import { Helmet } from "react-helmet-async";
import { Keywords } from "./keywords";
import { UrlUtils } from "@/Utils";

type PageMetaData = {
  title: string;
  desc: string;
  image: string;
  imageAltText: string;
  keywords?: string[];
};

const defaultMetaData: PageMetaData = {
  title: Loc.Web.Meta.Title,
  desc: Loc.Web.Meta.Desc,
  image: "/meta_img.jpg",
  imageAltText: "PersonaVerse Logo",
};

export namespace AppHelmet {
  export type Props = Partial<PageMetaData> & {};
}

export function AppHelmet(props: AppHelmet.Props) {
  const { keywords: keywordsProp, ...rest } = props;

  const meta: Required<PageMetaData> = {
    ...defaultMetaData,
    ...rest,
    keywords: [...Keywords, ...(keywordsProp ?? [])],
  };

  const metaKeywords = meta.keywords.join(", ");

  const path = UrlUtils.url().path;
  const prodUrl = `https://personaverse.com${path}`;

  return (
    <Helmet prioritizeSeoTags>
      <title>
        {(props.title && `${props.title} | `) || ""}
        {Loc.Common.AppName}
      </title>
      <meta name="description" content={meta.desc} />
      <meta name="keywords" content={metaKeywords} />

      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.desc} />
      <meta property="og:image" content={meta.image} />
      <meta property="og:image:alt" content={meta.imageAltText} />

      <link rel="canonical" href={prodUrl} />
    </Helmet>
  );
}
