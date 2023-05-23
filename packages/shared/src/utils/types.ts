import * as Yup from "yup";

export type YupShape<T extends {}> = Record<keyof T, Yup.AnySchema>;

export type WithSomeRequired<
  T extends {},
  RequiredFields extends keyof T
> = Partial<Omit<T, RequiredFields>> & Required<Pick<T, RequiredFields>>;

export type AllOrPartial<T extends {}> = Required<T> | Partial<T>;
