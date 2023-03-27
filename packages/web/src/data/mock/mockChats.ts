export type TMessage = {

};

export type TChat = {
    id: string;
    displayName: string;
    recipientDescription: string;
    lastMessage: string;
    messages: TMessage[];
};

export const mockChats: TChat[] = [
    {
        id: "1",
        displayName: "Dumbledore",
        recipientDescription: "Dumbledore from the sixth harry potter movie",
        messages: [],
        lastMessage: "How are you today?"
    },
    {
        id: "2",
        displayName: "Captain Jack Sparrow",
        recipientDescription: "Dumbledore from the sixth harry potter movie",
        messages: [],
        lastMessage: "Hello Mate"
    },
    {
        id: "3",
        displayName: "Donald Trump",
        recipientDescription: "Dumbledore from the sixth harry potter movie",
        messages: [],
        lastMessage: "Nobody is better than me"
    },
];
