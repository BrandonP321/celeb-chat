import React from 'react';
import { MainNav, ChatSideBar } from "@/Components";
import styles from "./AppLayout.module.scss";

export namespace AppLayout {
    export type Props = {
        children?: React.ReactNode;
    };
};

function AppLayout({ children }: AppLayout.Props) {
    return (
        <div className={styles.layout}>
            <MainNav />
            <div className={styles.lowerContent}>
                <ChatSideBar />
                <div className={styles.mainContent}>
                    {children}
                </div>
            </div>
        </div>
    )
};

export default AppLayout;