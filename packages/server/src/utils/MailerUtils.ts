import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
} from "@aws-sdk/client-ses";
import {
  EmailVerificationEmailString,
  PasswordResetEmailString,
} from "@celeb-chat/shared/src/api/mailer/emailBodies";
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

type VerificationEmailConfig = EmailConfig & {
  hash: string;
  userId: string;
  username: string;
};

export class Mailer {
  public static getPersonaVerseEmail = (
    alias: string,
    name = "PersonaVerse"
  ) => {
    return `"${name}" <${alias}@personaverse.com>`;
  };

  public static noReplyEmail = this.getPersonaVerseEmail("no-reply");

  private static getSendEmailInput = ({
    to,
    from = this.noReplyEmail,
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

  public static sendEmailVerificationEmail = ({
    to,
    hash,
    userId,
    username,
  }: VerificationEmailConfig) => {
    const command = new SendEmailCommand(
      this.getSendEmailInput({
        to: [to],
        body: EmailVerificationEmailString({
          userId,
          username,
          verificationHash: hash,
        }),
        subject: `Verify your PersonaVerse Email`,
      })
    );

    return client.send(command);
  };
}
