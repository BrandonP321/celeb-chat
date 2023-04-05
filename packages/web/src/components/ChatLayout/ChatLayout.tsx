import React, { useEffect, useState } from "react";
import { MainNav, ChatSideBar } from "@/Components";
import styles from "./ChatLayout.module.scss";
import { APIFetcher } from "utils/APIFetcher";
import { Outlet } from "react-router-dom";

const tempLogin = () => {
  return APIFetcher.login({
    email: "test@email.com",
    password: "Password@3278",
  });
};

export namespace ChatLayout {
  export type Props = {
    children?: React.ReactNode;
  };
}

function ChatLayout({ children }: ChatLayout.Props) {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    // TODO: remove once Login page is built
    tempLogin();
  }, []);

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
