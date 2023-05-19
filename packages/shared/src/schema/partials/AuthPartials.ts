import * as Yup from "yup";

export const emailSchema = Yup.string().email(
  "Hmm, that email doesn't look quite right. Check the format and try again!"
);
