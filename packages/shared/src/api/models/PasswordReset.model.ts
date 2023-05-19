import {
  TDefaultModelProps,
  TMongooseDoc,
  TMongooseModel,
  TMongooseSchema,
} from ".";

export namespace PasswordResetModel {
  export type PasswordReset = TDefaultModelProps & {
    email: string;
    confirmationHash: string;
    requestCreationTime: number;
  };

  export type Document = TMongooseDoc<PasswordReset, InstanceMethods>;
  export type Schema = TMongooseSchema<
    PasswordReset,
    InstanceMethods,
    StaticMethods
  >;
  export type Model = TMongooseModel<PasswordReset, InstanceMethods, Schema>;

  export type InstanceMethods = {};

  export type StaticMethods = {};
}
