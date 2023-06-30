import React from "react";
import { EmailVerificationEmailJSX } from "@celeb-chat/shared/src/api/mailer/emailBodies";

export namespace EmailVerificationEmailBody {
  export type Props = {};
}

export function EmailVerificationEmailBody(
  props: EmailVerificationEmailBody.Props
) {
  return <EmailVerificationEmailJSX {...props} />;
}
