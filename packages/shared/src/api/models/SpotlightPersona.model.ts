import {
  ResponseJSON,
  TDefaultModelProps,
  TMongooseDoc,
  TMongooseModel,
  TMongooseSchema,
} from ".";

export namespace SpotlightPersonaModel {
  export type Persona = TDefaultModelProps & {
    image: string;
    name: string;
    description: string;
  };

  export type Document = TMongooseDoc<Persona, InstanceMethods>;
  export type Schema = TMongooseSchema<Persona, InstanceMethods, StaticMethods>;
  export type Model = TMongooseModel<Persona, InstanceMethods, Schema>;

  export type InstanceMethods = {};

  export type StaticMethods = {};
}
