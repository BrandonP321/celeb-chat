import {
  SitemapStream,
  streamToPromise,
  EnumChangefreq,
  SitemapItemLoose,
} from "sitemap";
import { Readable } from "stream";
import fs from "fs";
import xmlFormatter from "xml-formatter";
import { format } from "date-fns";

const links: SitemapItemLoose[] = [
  { url: "/", changefreq: EnumChangefreq.DAILY },
  { url: "/login", changefreq: EnumChangefreq.DAILY },
  { url: "/register", changefreq: EnumChangefreq.DAILY },
  { url: "/chats", changefreq: EnumChangefreq.DAILY },
  { url: "/chat/new", changefreq: EnumChangefreq.DAILY },
].map((link) => ({
  ...link,
  lastmod: format(new Date(), "Y-MM-dd"),
}));

const stream = new SitemapStream({ hostname: "https://personaverse.com" });

export const writeSitemap = () =>
  streamToPromise(Readable.from(links).pipe(stream)).then(async (body) => {
    console.log("\nWRITING SITEMAP");

    let prettyXML = xmlFormatter(body.toString());

    prettyXML = prettyXML.replace(/T00:00:00\.000Z/g, "");

    fs.writeFileSync(__dirname + "/../public/sitemap.xml", prettyXML, {
      encoding: "utf-8",
    });

    console.log("SITEMAP CREATION SUCCESSFUL\n");
  });

writeSitemap();
