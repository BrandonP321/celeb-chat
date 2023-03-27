import React from 'react';
import { ChatCard } from "@/Components";
import { mockChats } from 'data/mock/mockChats';
import styles from "./ChatSideBar.module.scss";

export namespace ChatSideBar {
    export type Props = {

    }
}

function ChatSideBar(props: ChatSideBar.Props) {
    return (
        <div className={styles.chatBar}>
            {mockChats.map((chat, i) => (
                <ChatCard {...chat} key={i} />
            ))}
        </div>
    )
}

export default ChatSideBar;
