import * as Yup from "yup";

export const EditUserSchema = Yup.object().shape({
  // TODO: Implement regex match
  username: Yup.string().required(),
});
