import * as Yup from "yup";

export class SchemaUtils {
  public static async validateInput<T extends {}>(
    input: T,
    schema: Yup.ObjectSchema<any>
  ) {
    try {
      await schema.validate(input);

      return undefined;
    } catch (err) {
      const validationErr = err as Yup.ValidationError;

      return validationErr?.errors?.[0];
    }
  }

  public static getValidationFunc<T extends {}>(schema: Yup.ObjectSchema<any>) {
    return (input: T) => this.validateInput(input, schema);
  }
}
