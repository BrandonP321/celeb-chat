import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faHome } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { useChat } from "@/Hooks";
import { RouteHelper } from "utils/RouteHelper";

export namespace MainNav {
  export type Props = {
    toggleMobileNav: () => void;
    hideMobileNav: () => void;
    isMobileNavVisible: boolean;
  };
}

function MainNav({
  toggleMobileNav,
  isMobileNavVisible,
  hideMobileNav,
}: MainNav.Props) {
  const { chat, displayName } = useChat();

  return (
    <div className={styles.mainNav}>
      <Link to={"/"} className={styles.homeBtn}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
      </Link>
      <Link
        to={RouteHelper.EditChat({ chatId: chat?.id ?? "" })}
        className={styles.chatName}
      >
        <p>{displayName}</p>
      </Link>
      <button className={styles.mobileNavBtn} onClick={toggleMobileNav}>
        <FontAwesomeIcon
          icon={faBars}
          className={classNames(
            styles.icon,
            isMobileNavVisible && styles.close
          )}
        />
      </button>
    </div>
  );
}

type UserBtnProps = {
  showMobile: boolean;
  onClick: () => void;
};

const UserBtn = ({ showMobile, onClick }: UserBtnProps) => {
  return (
    <div
      className={classNames(
        styles.userBtnWrapper,
        showMobile && styles.showMobile
      )}
    >
      <Link className={styles.userBtn} onClick={onClick} to={"/user/dashboard"}>
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
      </Link>
    </div>
  );
};

export default MainNav;
