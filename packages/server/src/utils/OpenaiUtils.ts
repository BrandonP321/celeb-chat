import { Configuration, OpenAIApi } from "openai";

export class OpenaiUtils {}

export namespace OpenaiUtils {
  export enum OpenAIModel {
    Davinci = "davinci",
    GPT3Turbo = "gpt-3.5-turbo",
  }
}
