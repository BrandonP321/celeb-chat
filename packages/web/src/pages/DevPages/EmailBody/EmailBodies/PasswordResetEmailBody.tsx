import React from "react";
import { PasswordResetEmailJSX } from "@celeb-chat/shared/src/api/mailer/emailBodies";

export namespace PasswordResetEmailBody {
  export type Props = {};
}

export function PasswordResetEmailBody(props: PasswordResetEmailBody.Props) {
  return <PasswordResetEmailJSX />;
}
