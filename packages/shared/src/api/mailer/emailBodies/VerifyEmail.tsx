import React from "react";
import { convertJSXToString, Link, Text, Title } from "./emailBody";
import { AllOrPartial } from "../../../utils";

type Props = AllOrPartial<{
  username: string;
  verificationHash: string;
  userId: string;
}>;

export const EmailVerificationEmailJSX = ({
  username = "[Username]",
  verificationHash = "asdf",
  userId = "asdf",
}: Props) => {
  const verificationUrl = `https://personaverse.com/email/verify?hash=${verificationHash}&userId=${userId}`;

  return (
    <>
      <Title>Welcome to PersonaVerse {username}!</Title>
      <Text>
        Please click on the button below to verify your email address and unlock
        all the amazing features of PersonaVerse:
      </Text>
      <br />
      <br />
      <Link href={verificationUrl}>Verify Email</Link>
      <br />
      <br />
    </>
  );
};

export const EmailVerificationEmailString = (props: Props) =>
  convertJSXToString(<EmailVerificationEmailJSX {...props} />);
