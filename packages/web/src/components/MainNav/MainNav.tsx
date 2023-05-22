import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faMessage } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useChat } from "@/Hooks";
import { RouteHelper } from "utils/RouteHelper";

export namespace MainNav {
  export type Props = {
    toggleMobileNav: () => void;
    hideMobileNav: () => void;
    isMobileNavVisible: boolean;
    showMsgNavIcon?: boolean;
  };
}

function MainNav({
  toggleMobileNav,
  isMobileNavVisible,
  showMsgNavIcon = false,
}: MainNav.Props) {
  const { chat } = useChat();

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

      {!showMsgNavIcon && (
        <button className={styles.mobileNavBtn} onClick={toggleMobileNav}>
          <FontAwesomeIcon
            icon={faBars}
            className={classNames(
              styles.icon,
              isMobileNavVisible && styles.close
            )}
          />
        </button>
      )}

      {showMsgNavIcon && (
        <Link to={"/chat/adsf"} className={styles.msgNavIcon}>
          <FontAwesomeIcon icon={faMessage} className={styles.icon} />
        </Link>
      )}
    </div>
  );
}

export default MainNav;
