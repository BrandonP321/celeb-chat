import React, { useEffect, useState } from "react";
import styles from "./CookiePopup.module.scss";
import { Button, ButtonsWrapper } from "..";
import { CookieUtils, RouteHelper } from "@/Utils";
import classNames from "classnames";
import { Link } from "react-router-dom";

export namespace CookiePopup {
  export type Props = {};
}

export function CookiePopup(props: CookiePopup.Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(!CookieUtils.getHasUserDismissedCookiePopup());
    }, 500);
  }, []);

  const handleClick = () => {
    CookieUtils.setUserHasSeenCookiePopup();
    setShow(false);
  };

  return (
    <div className={classNames(styles.popup, show && styles.show)}>
      <p>
        By continuing to use our site, you are giving your consent for us to
        utilize strictly necessary cookies. Please review our{" "}
        <Link to={RouteHelper.PrivacyPolicy()}>Privacy Policy</Link> for more
        information.
      </p>
      <ButtonsWrapper className={styles.btns}>
        <Button onClick={handleClick}>Understood</Button>
      </ButtonsWrapper>
    </div>
  );
}
