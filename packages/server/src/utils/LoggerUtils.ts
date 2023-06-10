import winston from "winston";
import WinstonCloudWatch from "winston-cloudwatch";

const WCW = new WinstonCloudWatch({
  awsOptions: {
    credentials: {
      accessKeyId: process.env.AWS_IAM_CW_FULL_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.AWS_IAM_CW_FULL_ACCESS_KEY_SECRET ?? "",
    },
    region: "us-east-1",
  },
  logGroupName: () => {
    return `celeb-chat-server-logs-${process.env.ENV ?? "local"}`;
  },
  logStreamName: () => {
    const date = new Date().toISOString().split("T")[0];

    return `server-${date}`;
  },
});

winston.add(WCW);

export const Logger = winston;
