import React, { useState } from "react";
import { MainNav, ChatSideBar } from "@/Components";
import styles from "./ChatLayout.module.scss";
import { Outlet } from "react-router-dom";

export namespace ChatLayout {
  export type Props = {
    children?: React.ReactNode;
  };
}

function ChatLayout({ children }: ChatLayout.Props) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <div className={styles.layout}>
      <MainNav
        toggleMobileNav={() => setShowMobileNav(!showMobileNav)}
        isMobileNavVisible={showMobileNav}
      />
      <div className={styles.lowerContent}>
        <ChatSideBar
          showInMobile={showMobileNav}
          hideInMobile={() => setShowMobileNav(false)}
        />
        <div className={styles.mainContent}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
