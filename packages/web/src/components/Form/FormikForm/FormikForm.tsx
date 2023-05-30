import React, { useEffect } from "react";
import {
  Formik,
  FormikConfig,
  FormikHelpers,
  Form,
  useFormikContext,
  FormikState,
} from "formik";
import { ObjectUtils, WithSomeRequired } from "@celeb-chat/shared/src/utils";
import { FormikSubmit } from "@/Utils";
import { useAppDispatch } from "@/Hooks";
import { Actions } from "@/Slices";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { useLocation } from "react-router-dom";

type TFields = { [key: string]: string };

export namespace FormikFormWrapper {
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

export function FormikFormWrapper<
  EnumFields extends TFields,
  Values extends TFields
>(props: FormikFormWrapper.Props<EnumFields, Values>) {
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

export namespace FormikForm {
  export type Props<T> = (typeof Form)["defaultProps"] & {
    /** If value is provided, will exectute `resetForm` on page load with new state */
    resetOnPageLoadProps?: Partial<FormikState<T>>;
  };
}

export function FormikForm<T>(props: FormikForm.Props<T>) {
  const { resetOnPageLoadProps, ...rest } = props;

  const { resetForm } = useFormikContext();
  const location = useLocation();

  useEffect(() => {
    resetOnPageLoadProps && resetForm(resetOnPageLoadProps);
  }, [location, resetForm, resetOnPageLoadProps]);

  return <Form {...rest} />;
}
