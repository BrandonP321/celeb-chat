import { matchPath } from "react-router-dom";

export class ChatUtils {
    public static getChatIdFromChatUrl = () => {
        const { params } = matchPath("/chat/:chatId", window.location.pathname) ?? {};
        return params?.chatId
    }
}