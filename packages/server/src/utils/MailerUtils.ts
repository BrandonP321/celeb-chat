import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from "@aws-sdk/client-ses";
import { PasswordResetEmailString } from "@celeb-chat/shared/src/api/mailer/emailBodies";
import { Loc } from "./Loc";

const client = new SESClient({
  region: process.env.AWS_IAM_SES_FULL_ACCESS_REGION ?? "",
  credentials: {
    accessKeyId: process.env.AWS_IAM_SES_FULL_ACCESS_KEY_ID ?? "",
    secretAccessKey: process.env.AWS_IAM_SES_FULL_ACCESS_KEY_SECRET ?? "",
  },
});

type SendEmailInputParams = {
  from?: string;
  to: string[];
  subject: string;
  body: string;
};

type EmailConfig = {
  to: string;
};

type PasswordResetEmailConfig = EmailConfig & {
  confirmationHash: string;
  confirmationId: string;
};

export class Mailer {
  private static getSendEmailInput = ({
    to,
    // TODO: Update when no-reply email is created
    from = "bphillips@fiction-chat.com",
    body,
    subject,
  }: SendEmailInputParams): SendEmailCommandInput => ({
    Source: from,
    Destination: {
      ToAddresses: to,
    },
    Message: {
      Subject: {
        Data: subject,
      },
      Body: {
        Html: {
          Data: body,
        },
      },
    },
  });

  // TODO: Pass in user's name/username for email HTML
  public static sendPasswordResetEmail = ({
    to,
    confirmationId,
    confirmationHash,
  }: PasswordResetEmailConfig) => {
    const command = new SendEmailCommand(
      this.getSendEmailInput({
        to: [to],
        body: PasswordResetEmailString({ confirmationHash, confirmationId }),
        subject: `Your ${Loc.Common.AppName} Password Reset Instructions`,
      })
    );

    return client.send(command);
  };
}
