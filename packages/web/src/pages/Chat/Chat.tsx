import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames';
import {
    ChatCompletionRequestMessage,
    ChatCompletionResponseMessageRoleEnum,
    ChatCompletionRequestMessageRoleEnum,
    Configuration,
    OpenAIApi,
} from 'openai';
import styles from "./Chat.module.scss";

enum OpenAIModel {
    Davinci = "davinci",
    GPT3Turbo = "gpt-3.5-turbo"
}

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const model = OpenAIModel.GPT3Turbo;

const getTrainingMsg = (character: string) => (
    `For the rest of this conversation, you will be texting me while impersonating ${character}.  Specifically, you will also take on any stereotypical traits of ${character}.  Also, if ${character} has any specific speech patterns, attempt to mimic those speech patterns in your response.`
)

export namespace Chat {
    export type Props = {

    };
};

function Chat(props: Chat.Props) {
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessagesState] = useState<ChatCompletionRequestMessage[]>([]);
    const messagesRef = useRef<ChatCompletionRequestMessage[]>([]);

    useEffect(() => {
        let character = "Dumbledore"

        // character = window.prompt("Who would you like to talk to?") || "Dumbledore"

        setMessages([constructMsg(getTrainingMsg(character))])

    }, [])

    const setMessages = (data: ChatCompletionRequestMessage[]) => {
        setMessagesState(data);
        messagesRef.current = [...data];
    }

    const sendMsg = (msg: string) => {
        setInput("");
        setLoading(true);

        messagesRef.current.push(constructMsg(msg));

        setMessages(messagesRef.current);

        openai.createChatCompletion({
            model,
            messages: messagesRef.current
        }).then(res => {
            const msgObj = res.data.choices[0].message;

            if (msgObj) {
                messagesRef.current.push(msgObj);
                setMessages(messagesRef.current);
            } else {
                alert("error sending message, please refresh");
            }

            setLoading(false);
        }).catch(err => {
            alert("error sending message, please refresh")
            setLoading(false);
        })
    }

    const constructMsg = (msg: string, role?: ChatCompletionResponseMessageRoleEnum): ChatCompletionRequestMessage => ({
        content: msg,
        role: role || ChatCompletionRequestMessageRoleEnum.User,
    })

    return (
        <div className={styles.app}>
            <div className={styles.messages}>
                {messages.map((msg, i) => (
                    i !== 0 && (
                        <p
                            key={i}
                            className={classNames(msg.role === ChatCompletionResponseMessageRoleEnum.User && styles.user)}
                        >
                            {msg.content}
                        </p>
                    )
                ))}
            </div>

            <form className={styles.form}>
                <input
                    value={input}
                    className={styles.input}
                    disabled={loading}
                    onChange={(e) => setInput(e.currentTarget.value)}
                    style={{ width: "asdf" }}
                />
                <button
                    className={styles.sendBtn}
                    disabled={loading}
                    onClick={(e) => {
                        e.preventDefault()
                        sendMsg(input)
                    }}
                >Send</button>
            </form>
        </div>
    );
}

export default Chat;