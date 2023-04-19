import axios, { AxiosError, AxiosResponse } from "axios";
import {
  GetUserChatsRequest,
  GetUserRequest,
} from "@celeb-chat/shared/src/api/Requests/user.requests";
import {
  LoginRequest,
  RegisterAccountRequest,
} from "@celeb-chat/shared/src/api/Requests/auth.requests";
import { SendMsgRequest } from "@celeb-chat/shared/src/api/Requests/message.requests";
import {
  ChatRequest,
  CreateChatRequest,
  GetChatMessagesRequest,
  GetChatRequest,
} from "@celeb-chat/shared/src/api/Requests/chat.requests";
import { DefaultErrors } from "@celeb-chat/shared/src/api/Requests";
import { Routes } from "@celeb-chat/shared/src/api/routes";
import { UrlUtils } from "./UrlUtils";

const apiDomain = process.env.REACT_APP_API_DOMAIN;

export class APIFetcher {
  private static defaultConfig = {
    withCredentials: true,
  };

  private static fetchDefaultHandler<Response extends {}>(
    fetch: () => Promise<AxiosResponse<Response>>
  ): Promise<Response> {
    return new Promise<Response>(async (resolve, reject) => {
      try {
        const res = await fetch();

        return resolve(res.data);
      } catch (err) {
        const error = err as AxiosError<DefaultErrors.Error>;
        const errCode = error?.response?.data?.errCode;

        // TODO: consider handling other error codes
        if (!errCode) {
          reject(DefaultErrors.Errors.NetworkError);
        } else if (errCode === DefaultErrors.ErrorCode.NotAuthenticated) {
          // TODO: implement navigation that stays within react router & replace url
          // On auth error, redirect to login page with query param for redirecting to current page on auth
          window.location.href = UrlUtils.url()
            .setPath("/login")
            .addParams({
              [UrlUtils.queryParamKeys.redirectTo]: UrlUtils.url().allButDomain,
            }).allButDomain;
        } else {
          reject(error?.response?.data);
        }
      }
    });
  }

  private static post<Response extends {}, Params extends {} = {}>(
    endpointPath: string,
    params: Params
  ) {
    return this.fetchDefaultHandler(() =>
      axios.post<Response>(
        `${apiDomain}${endpointPath}`,
        params,
        this.defaultConfig
      )
    );
  }

  private static get<Response extends {}>(endpointPath: string) {
    return this.fetchDefaultHandler(() =>
      axios.get<Response>(`${apiDomain}${endpointPath}`, this.defaultConfig)
    );
  }

  public static login = (params: LoginRequest.ReqBody) =>
    APIFetcher.post<LoginRequest.Response>(Routes.Auth.Login(), params);

  public static register = (params: RegisterAccountRequest.ReqBody) =>
    APIFetcher.post<RegisterAccountRequest.Response>(
      Routes.Auth.Register(),
      params
    );

  public static getChatMessages = (params: GetChatMessagesRequest.ReqBody) =>
    APIFetcher.post<GetChatMessagesRequest.Response>(
      Routes.Chat.GetChatMessages(),
      params
    );

  public static getChat = (params: ChatRequest.ReqBody) =>
    APIFetcher.post<GetChatRequest.Response>(Routes.Chat.GetChat(), params);

  public static createChat = (params: CreateChatRequest.ReqBody) =>
    APIFetcher.post<CreateChatRequest.Response>(
      Routes.Chat.CreateChat(),
      params
    );

  public static getUserChats = () =>
    APIFetcher.get<GetUserChatsRequest.Response>(Routes.User.GetUserChats());

  public static sendMsg = (params: SendMsgRequest.ReqBody) =>
    APIFetcher.post<SendMsgRequest.Response>(Routes.Msg.SendMsg(), params);

  public static getUser = () =>
    APIFetcher.get<GetUserRequest.Response>(Routes.User.GetFullUser());
}
