import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faMessage } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useAppDispatch, useChat, useChatSidebar } from "@/Hooks";
import { RouteHelper } from "utils/RouteHelper";
import { Actions } from "@/Slices";

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

  return (
    <div className={styles.mainNav}>
      <Link to={"/"} className={styles.homeBtn}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
      </Link>
      <Link
        to={RouteHelper.EditChat({ chatId: chat?.id ?? "" })}
        className={styles.chatName}
      >
        <p>{chat?.displayName}</p>
      </Link>

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
