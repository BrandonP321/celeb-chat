import * as Yup from "yup";

// TODO: This whole schema needs attention
export const EditUserSchema = Yup.object().shape({
  // TODO: Implement regex match
  username: Yup.string().required(),
});
