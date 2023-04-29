import * as Yup from "yup";

export type YupShape<T extends {}> = Record<keyof T, Yup.AnySchema>;
