import { matchPath } from "react-router-dom";

export class WebChatUtils {
  public static getChatIdFromChatUrl = () => {
    const { params } =
      matchPath("/chat/:chatId", window.location.pathname) ?? {};
    return params?.chatId;
  };
}
