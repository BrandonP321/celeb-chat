import React, { useState } from "react";
import {
  MainNav,
  ChatSideBar,
  AlertToasts,
  LoadingContainer,
} from "@/Components";
import styles from "./ChatLayout.module.scss";
import { Outlet } from "react-router-dom";
import { useAuthenticatedPage, useUser } from "@/Hooks";

export namespace ChatLayout {
  export type Props = {
    children?: React.ReactNode;
  };
}

function ChatLayout({ children }: ChatLayout.Props) {
  useAuthenticatedPage();

  const [showMobileNav, setShowMobileNav] = useState(false);
  const { user } = useUser();

  return (
    <div className={styles.layout}>
      <MainNav
        toggleMobileNav={() => setShowMobileNav(!showMobileNav)}
        hideMobileNav={() => setShowMobileNav(false)}
        isMobileNavVisible={showMobileNav}
      />
      <div className={styles.lowerContent}>
        <ChatSideBar
          showInMobile={showMobileNav}
          hideInMobile={() => setShowMobileNav(false)}
        />
        <div className={styles.mainContent}>
          <LoadingContainer loading={!user} />
          <AlertToasts />
          {user && <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default ChatLayout;
