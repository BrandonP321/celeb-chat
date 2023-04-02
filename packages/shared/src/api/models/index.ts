import mongoose, { Document, Model, Schema } from "mongoose";

export type TDefaultModelProps = {
  id: string;
  _id: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
};

export type TMongooseDoc<
  DocType,
  TInstanceMethods,
  TID = mongoose.Types.ObjectId
> = DocType & TInstanceMethods & Document<TID, {}, DocType>;
export type TMongooseModel<
  DocType,
  TInstanceMethods,
  TSchema,
  TVirtuals = {}
> = Model<DocType, {}, TInstanceMethods, TVirtuals, TSchema>;
export type TMongooseSchema<
  TDocTypeProps,
  TInstanceMethods,
  TStaticMethods = {}
> = Schema<
  TDocTypeProps,
  Model<TDocTypeProps, any, any, any>,
  TInstanceMethods,
  {},
  {},
  TStaticMethods
>;

/** Utility type for JSON response of document from DB */
export type ResponseJSON<T extends {}> = Omit<T, "_id"> & {};
