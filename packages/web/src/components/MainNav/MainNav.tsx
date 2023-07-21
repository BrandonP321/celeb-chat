import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faComments,
  faMessage,
  faUser,
} from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useAppDispatch, useChat, useChatSidebar, useUser } from "@/Hooks";
import { RouteHelper } from "utils/RouteHelper";
import { Actions } from "@/Slices";
import { Loc } from "@/Loc";
import { WebChatUtils } from "@/Utils";
import { ButtonLink } from "@/Components";

export namespace MainNav {
  export type Props = {
    showChatNavLink?: boolean;
    withChatSidebar?: boolean;
  };
}

function MainNav({ showChatNavLink, withChatSidebar }: MainNav.Props) {
  const { chat } = useChat();
  const { user } = useUser();
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
        <img
          src="/appLogo.svg"
          className={styles.icon}
          alt="PersonaVerse Logo"
        />
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
        <ButtonLink
          // variant="secondaryGradient"
          to={!!user ? RouteHelper.Chats() : RouteHelper.Login()}
          rightIcon={!!user ? faComments : faUser}
          style={{ fontSize: "1rem" }}
          classes={{ root: styles.chatBtn }}
        >
          {!!user ? "Chats" : "Login"}
        </ButtonLink>
      )}
    </div>
  );
}

export default MainNav;
