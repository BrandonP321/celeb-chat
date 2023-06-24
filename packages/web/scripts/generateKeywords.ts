import { Keywords } from "../src/components/AppHelmet/keywords";
import fs from "fs";

const keywords = Keywords.join(", ");
const htmlPath = __dirname + "/../public/index.html";

console.log("\nREADING index.html to add keywords");

const html = fs.readFileSync(htmlPath);

console.log("REPLACING KEYWORDS IN index.html");

const htmlWithKeywords = html
  .toString()
  .replace(/keywords" content=".*"/, `keywords" content="${keywords}"`);

console.log("WRITING TO index.html");

fs.writeFileSync(htmlPath, htmlWithKeywords);

console.log("KEYWORDS UPDATE COMPLETE\n");
