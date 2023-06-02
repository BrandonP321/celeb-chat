import * as Yup from "yup";
import { RegexUtils } from "../../utils";

const nameMaxLength = 30;
const descMaxLength = 200;

export const chatDisplayNameSchema = Yup.string()
  .max(
    nameMaxLength,
    `Whoops, your character's name is a little too long. It should be under ${nameMaxLength} characters.`
  )
  .matches(
    RegexUtils.chatNameRegex,
    "Hold up! Double quotes aren't friends with character names. Could you remove them, please?"
  );
export const chatDescriptionSchema = Yup.string()
  .max(
    descMaxLength,
    `Easy there, Tolstoy! Your character description is too lengthy. It needs to be under ${descMaxLength} characters.`
  )
  .matches(
    RegexUtils.chatDescRegex,
    "Oops, your character description has double quotes in it. They're not allowed, sorry! Can you take them out for us?"
  );
