import React from "react";
import { convertJSXToString, Link, Text, Title } from "./emailBody";
import { AllOrPartial } from "../../../utils";
import { Loc } from "../../../../loc";

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
  const resetUrl = `https://personaverse.com/password/reset?confirmationId=${confirmationId}&confirmationHash=${confirmationHash}`;

  return (
    <>
      <Title>Hello,</Title>
      <Text>
        We received a request to reset your password for your{" "}
        {Loc.Common.AppName} account.
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
      <Text>The {Loc.Common.AppName} Team</Text>
    </>
  );
}

export const PasswordResetEmailString = (props: Props) =>
  convertJSXToString(<PasswordResetEmailJSX {...props} />);
