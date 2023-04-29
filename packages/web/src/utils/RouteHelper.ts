import { CreateChatField } from "pages/CreateChat/CreateChatForm";
import { UrlUtils } from "./UrlUtils";

export class RouteHelper {
  public static CreateChat = (params?: {
    [key in CreateChatField]?: string;
  }) => {
    const searchParams = UrlUtils.url().addParams(params ?? {}).paramsString;

    return `/chat/new${searchParams}`;
  };
}
