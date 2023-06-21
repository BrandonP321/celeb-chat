import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faMessage } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useAppDispatch, useChat, useChatSidebar } from "@/Hooks";
import { RouteHelper } from "utils/RouteHelper";
import { Actions } from "@/Slices";
import { Loc } from "@/Loc";
import { WebChatUtils } from "@/Utils";

export namespace MainNav {
  export type Props = {
    showChatNavLink?: boolean;
    withChatSidebar?: boolean;
  };
}

function MainNav({ showChatNavLink, withChatSidebar }: MainNav.Props) {
  const { chat } = useChat();
  const sidebar = useChatSidebar();
  const dispatch = useAppDispatch();

  const toggleSidebar = () => {
    dispatch(Actions.ChatSidebar.toggle());
  };

  const chatIdFromEditUrl = WebChatUtils.getChatIdFromEditUrl();
  const chatIdFromChatUrl = WebChatUtils.getChatIdFromChatUrl();

  const chatUrl = chatIdFromEditUrl
    ? RouteHelper.Chat({ chatId: chatIdFromEditUrl })
    : RouteHelper.EditChat({ chatId: chatIdFromChatUrl ?? "" });

  return (
    <div className={styles.mainNav}>
      <Link to={"/"} className={styles.homeBtn}>
        <img src="/appLogo.svg" className={styles.icon} />
        <span>{Loc.Common.AppName}</span>
      </Link>

      {chat?.displayName && (
        <Link to={chatUrl} className={styles.chatName}>
          <p>{chat?.displayName}</p>
        </Link>
      )}

      {withChatSidebar && (
        <button className={styles.mobileNavBtn} onClick={toggleSidebar}>
          <FontAwesomeIcon
            icon={faBars}
            className={classNames(styles.icon, sidebar.show && styles.close)}
          />
        </button>
      )}

      {showChatNavLink && (
        <Link to={"/chats"} className={styles.msgNavIcon}>
          <FontAwesomeIcon icon={faMessage} className={styles.icon} />
        </Link>
      )}
    </div>
  );
}

export default MainNav;
