import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required(),
  password: Yup.string().required(),
});
