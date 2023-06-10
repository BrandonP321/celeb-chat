import { CreateChatField } from "pages/CreateChat/CreateChatForm";
import { UrlUtils } from "./UrlUtils";

export class RouteHelper {
  public static CreateChat = (params?: {
    [key in CreateChatField]?: string;
  }) => {
    const searchParams = UrlUtils.url().addParams(params ?? {}).paramsString;

    return `/chat/new${searchParams}`;
  };

  public static EditChat = ({ chatId }: { chatId: string }) => {
    return `/chat/${chatId}/edit`;
  };

  public static Login = (withRedirect?: boolean) => {
    if (withRedirect) {
      return (window.location.href = UrlUtils.url()
        .setPath("/login")
        .addParams({
          [UrlUtils.queryParamKeys.redirectTo]: UrlUtils.url().allButDomain,
        }).allButDomain);
    } else {
      return "/login";
    }
  };
}
