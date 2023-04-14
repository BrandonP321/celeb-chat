import * as Yup from "yup";

export const CreateChatSchema = Yup.object().shape({
  displayName: Yup.string().required(),
  description: Yup.string().required(),
});
