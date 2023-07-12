import { UserModel } from "../api/models/User.model";
import { FACHelper } from "./FACHelper";

const CustomTrainingAllowedEmails = [
  "dsandbak@personaverse.com",
  "bphillips@personaverse.com",
  "brandon.phillips976@gmail.com",
];

export const isCustomTrainingEnabled = (user: UserModel.Document) =>
  FACHelper.getIsEnabled(CustomTrainingAllowedEmails, user.email);
