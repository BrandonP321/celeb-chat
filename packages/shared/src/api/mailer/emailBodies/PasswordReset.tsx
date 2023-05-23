import React from "react";
import {
  convertJSXToString,
  Color,
  Header,
  Link,
  Text,
  Title,
} from "./emailBody";
import { AllOrPartial } from "../../../utils";

type Props = AllOrPartial<{
  name: string;
  confirmationId: string;
  confirmationHash: string;
}>;

export function PasswordResetEmailJSX({
  name = "[User's Name]",
  confirmationHash = "someConfirmationHash",
  confirmationId = "someConfirmationId",
}: Props) {
  const resetUrl = `https://dev.fiction-chat.com/password/reset?confirmationId=${confirmationId}&confirmationHash=${confirmationHash}`;

  return (
    <>
      <Title>Hello {name},</Title>
      {/* // TODO: Update app name */}
      <Text>
        We received a request to reset your password for your XYZ account.
      </Text>
      <Text>To reset your password, please click the link below:</Text>
      <br />
      <Link href={resetUrl}>Reset Your Password Now!</Link>
      <br />
      <br />
      <br />
      <Text>
        If you didn't request this, you can safely ignore this email. The link
        will be usable for the next 24 hours.
      </Text>
      <br />
      <br />
      <Text>Best,</Text>
      {/* // TODO: Update app name */}
      <Text>The XYZ Team</Text>
    </>
  );
}

export const PasswordResetEmailString = (props: Props) =>
  convertJSXToString(<PasswordResetEmailJSX {...props} />);
