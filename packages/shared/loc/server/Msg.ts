export const Msg = {
  OpenAIFetchErr: "A new msg was unable to be created",
  ChatCompleteErr:
    "Whoops, we're having a hiccup getting a response for your message. Give it another try, and if the problem persists, let us know!",
  InvalidInput: "Message input does not match required format",

  Schema: {
    msgMaxLength: (max: number) =>
      `Whoa, that's a long one! Keep your message under ${max} characters, please.`,
    msgRequired:
      "Don't leave them hanging! Add a message to continue the conversation.",
  },
} as const;
