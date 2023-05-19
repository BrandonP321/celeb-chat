import React from "react";
import { Formik, FormikConfig, FormikHelpers } from "formik";
import { ObjectUtils, WithSomeRequired } from "@celeb-chat/shared/src/utils";
import { FormikSubmit } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";

type TFields = { [key: string]: string };

export namespace FormikForm {
  export type Props<
    EnumFields extends TFields,
    Values = { [key in EnumFields[keyof EnumFields]]: keyof EnumFields }
  > = WithSomeRequired<FormikConfig<Values>, "validationSchema"> & {
    /** Enum of field names */
    fields: EnumFields;
    defaultOnSubmit?: (
      values: Values,
      formik: FormikHelpers<Values>
    ) => Promise<any>;
    defaultSubmitSuccessMsg?: string;
  };
}

export function FormikForm<EnumFields extends TFields, Values extends TFields>(
  props: FormikForm.Props<EnumFields, Values>
) {
  const {
    initialValues,
    fields,
    validateOnChange = false,
    onSubmit = () => {},
    defaultOnSubmit,
    defaultSubmitSuccessMsg,
    ...rest
  } = props;

  const dispatch = useAppDispatch();

  const emptyInitValues: Values = ObjectUtils.invertAndSetEmptyValue(
    fields
  ) as any;

  const initValues: Values = {
    ...emptyInitValues,
    ...initialValues,
  };

  const handleDefaultSubmit: FormikSubmit<Values> = async (values, formik) => {
    if (!defaultOnSubmit) {
      return;
    }

    return defaultOnSubmit(values, formik)
      .then(() => {
        defaultSubmitSuccessMsg &&
          dispatch(
            Actions.Alert.addSuccessAlert({
              msg: defaultSubmitSuccessMsg,
            })
          );
      })
      .catch((err: DefaultErrors.Error) => {
        dispatch(Actions.Alert.addErrorAlert({ msg: err.msg }));
      });
  };

  return (
    <Formik
      {...rest}
      onSubmit={(v, f) =>
        defaultOnSubmit ? handleDefaultSubmit(v, f) : onSubmit(v, f)
      }
      initialValues={initValues}
      validateOnChange={validateOnChange}
    />
  );
}
