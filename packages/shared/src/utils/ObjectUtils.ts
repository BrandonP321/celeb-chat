import _ from "lodash";

export class ObjectUtils {
  public static invertAndSetEmptyValue = <T extends { [key: string]: any }>(
    obj: T
  ): { [key in T[keyof T]]: string } => {
    const keysArr = _.keys(_.invert(obj)).map((key) => ({ key }));

    const keysObj = _.keyBy(keysArr, (o) => o.key) as any;

    let key: keyof typeof keysObj;
    for (key in keysObj) {
      keysObj[key] = "";
    }

    return keysObj;
  };
}
