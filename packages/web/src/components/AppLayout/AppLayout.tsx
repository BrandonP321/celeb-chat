import React, { useEffect } from "react";
import {
  MainNav,
  ChatSideBar,
  AlertToasts,
  LoadingContainer,
} from "@/Components";
import styles from "./AppLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthenticatedPage, useUser } from "@/Hooks";
import { UrlUtils } from "@/Utils";
import ReactGA from "react-ga4";

const useGoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = UrlUtils.url().path;

    ReactGA.send({ 
      hitType: "pageview", 
      page: path, 
    });
  }, [location])
}

export namespace AppLayout {
  export type Props = {
    withChatSidebar?: boolean;
    renderOutlet?: boolean;
    showChatNavLink?: boolean;
  };
}

function AppLayout({
  withChatSidebar,
  renderOutlet = true,
  showChatNavLink,
}: AppLayout.Props) {
  useGoogleAnalytics()

  return (
    <div className={styles.layout}>
      <MainNav
        showChatNavLink={showChatNavLink}
        withChatSidebar={withChatSidebar}
      />
      <div className={styles.lowerContent}>
        {withChatSidebar && <ChatSideBar />}

        <div className={styles.mainContent}>
          <LoadingContainer loading={!renderOutlet} />
          <AlertToasts />
          {renderOutlet && <Outlet />}
        </div>
      </div>
    </div>
  );
}

export namespace AuthenticatedAppLayout {
  export type Props = AppLayout.Props & {};
}

export function AuthenticatedAppLayout(props: AuthenticatedAppLayout.Props) {
  useAuthenticatedPage();

  const { user } = useUser();

  return <AppLayout {...props} renderOutlet={!!user} />;
}

export default AppLayout;
