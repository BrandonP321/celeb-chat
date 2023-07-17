import { UserModel } from "../api/models/User.model";
import { FACHelper } from "./FACHelper";

export const isCustomTrainingEnabled = (email: string) =>
  FACHelper.getIsEnabled(email);
