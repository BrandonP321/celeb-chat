import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser, faHome } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { Link, useNavigate } from "react-router-dom";
import { useChat } from "@/Hooks";

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
  return (
    <div className={styles.mainNav}>
      <Link to={"/"} className={styles.homeBtn}>
        <FontAwesomeIcon icon={faHome} className={styles.icon} />
      </Link>
      <div className={styles.rightContent}>
        <UserBtn showMobile={isMobileNavVisible} onClick={hideMobileNav} />
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
