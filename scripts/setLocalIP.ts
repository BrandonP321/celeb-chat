import fs from "fs";
import * as os from "os";
// import QRCode from "qrcode";
import qrcode from "qrcode-terminal";

const envRelativePaths = ["/../packages/web/.env", "/../packages/server/.env"];
const ipAddress = getIpAddress();

console.log(`\nSetting IP ADDRESS ENV VARS to ${ipAddress}`);

envRelativePaths.forEach((filePath) => {
  const absolutePath = __dirname + filePath;
  console.log(`UPDATING IP ADDRESS FOR .env AT ${absolutePath}`);

  let content = fs.readFileSync(absolutePath, { encoding: "utf-8" });

  content = content.replace(/10\.0\.0\.\d*/g, ipAddress);

  fs.writeFileSync(absolutePath, content);
});

console.log("ALL IP ADDRESS ENV VARS UPDATED\n");

qrcode.setErrorLevel("Q");

const webAppLocalAddress = `http://${ipAddress}:3000`;

qrcode.generate(webAppLocalAddress, { small: true }, (code) => {
  console.log(`React App: ${webAppLocalAddress}`);
  console.log(code);
});

// const nodeServerLocalAddress = `http://${ipAddress}:8000`;

// qrcode.generate(nodeServerLocalAddress, { small: true }, (code) => {
//   console.log(`Node Server: ${nodeServerLocalAddress}`);
//   console.log(code);
// });

function getIpAddress() {
  const nets = os.networkInterfaces();
  const results: { [key: string]: string[] } = {};

  for (const name of Object.keys(nets)) {
    const netInterface = nets[name];

    if (netInterface) {
      for (const net of netInterface) {
        // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
        // 'IPv4' is in Node <= 17, from 18 it's a number 4 or 6
        const familyV4Value = typeof net.family === "string" ? "IPv4" : 4;
        if (net.family === familyV4Value && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          results[name].push(net.address);
        }
      }
    }
  }

  const ipAddress = results.Ethernet?.[0] ?? results["Wi-Fi"][0]

  if (!ipAddress) {
    throw new Error(
      "An error occurred while retrieving the current IP address"
    );
  }

  return ipAddress;
}

export {};
