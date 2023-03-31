import React from "react";
import styles from "./MainNav.module.scss";

export namespace MainNav {
  export type Props = {
    toggleMobileNav: () => void;
    isMobileNavVisible: boolean;
  };
}

function MainNav({ toggleMobileNav, isMobileNavVisible }: MainNav.Props) {
  return (
    <div className={styles.mainNav}>
      <button className={styles.mobileNavBtn} onClick={toggleMobileNav}>
        Toggle mobile nav
      </button>
    </div>
  );
}

export default MainNav;
