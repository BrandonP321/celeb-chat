import React, { useState } from "react";
import { MainNav, ChatSideBar } from "@/Components";
import styles from "./AppLayout.module.scss";

export namespace AppLayout {
  export type Props = {
    children?: React.ReactNode;
  };
}

function AppLayout({ children }: AppLayout.Props) {
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
        <div className={styles.mainContent}>{children}</div>
      </div>
    </div>
  );
}

export default AppLayout;
