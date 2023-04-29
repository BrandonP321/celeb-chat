import { matchPath } from "react-router-dom";

export class WebChatUtils {
  public static getChatIdFromChatUrl = () => {
    const { params } =
      matchPath("/chat/:chatId", window.location.pathname) ?? {};
    return params?.chatId;
  };

  public static getChatIdFromEditUrl = () => {
    const { params } =
      matchPath("/chat/:chatId/edit", window.location.pathname) ?? {};
    return params?.chatId;
  };
}
