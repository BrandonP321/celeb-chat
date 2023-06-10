import { ChatUtils, Message } from "@celeb-chat/shared/src/utils/ChatUtils";
import { Configuration, OpenAIApi } from "openai";
import { OpenaiUtils } from "./OpenaiUtils";
import { ChatModel } from "@celeb-chat/shared/src/api/models/Chat.model";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openai = new OpenAIApi(configuration);

export class OpenaiFetcher {
  public static fetchChatCompletion = (
    msgBody: string,
    messages: ChatModel.IndexlessMessage[]
  ): ReturnType<typeof openai["createChatCompletion"]> => {
    const msg = ChatUtils.constructMsg(msgBody);

    return openai.createChatCompletion({
      model: OpenaiUtils.OpenAIModel.GPT3Turbo,
      messages: [...messages, msg],
    });
  };
}
