import React from "react";
import styles from "./MainNav.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/pro-solid-svg-icons";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

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
  );
}

type UserBtnProps = {
  showMobile: boolean;
  onClick: () => void;
};

const UserBtn = ({ showMobile, onClick }: UserBtnProps) => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames(
        styles.userBtnWrapper,
        showMobile && styles.showMobile
      )}
    >
      <button
        className={styles.userBtn}
        onClick={() => {
          navigate("/user/dashboard");
          onClick();
        }}
      >
        <FontAwesomeIcon icon={faUser} className={styles.icon} />
      </button>
    </div>
  );
};

export default MainNav;
