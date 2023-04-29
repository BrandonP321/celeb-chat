import * as Yup from "yup";

// TODO: Update default values
export const chatDisplayNameSchema = Yup.string().min(2);
export const chatDescriptionSchema = Yup.string().min(5);
