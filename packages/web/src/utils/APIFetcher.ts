import axios from "axios";
import { GetUserChatsRequest } from "@celeb-chat/shared/src/api/Requests/user.requests";
import { LoginRequest } from "@celeb-chat/shared/src/api/Requests/auth.requests";
import {
  ChatRequest,
  GetChatMessagesRequest,
  GetChatRequest,
} from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { Routes } from "@celeb-chat/shared/src/api/routes";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

export class APIFetcher {
  private static defaultConfig = {
    withCredentials: true,
  };

  private static post<Response extends {}, Params extends {} = {}>(
    endpointPath: string,
    params: Params
  ) {
    return axios.post<Response>(
      `${apiDomain}${endpointPath}`,
      params,
      this.defaultConfig
    );
  }

  private static get<Response extends {}>(endpointPath: string) {
    return axios.get<Response>(
      `${apiDomain}${endpointPath}`,
      this.defaultConfig
    );
  }

  public static login = (params: LoginRequest.ReqBody) =>
    APIFetcher.post<LoginRequest.Response>(Routes.Auth.Login(), params);

  public static getChatMessages = (params: ChatRequest.ReqBody) =>
    APIFetcher.post<GetChatMessagesRequest.Response>(
      Routes.Chat.GetChatMessages(),
      params
    );

  public static getChat = (params: ChatRequest.ReqBody) =>
    APIFetcher.post<GetChatRequest.Response>(Routes.Chat.GetChat(), params);

  public static getUserChats = () =>
    APIFetcher.get<GetUserChatsRequest.Response>(Routes.User.GetUserChats());
}
