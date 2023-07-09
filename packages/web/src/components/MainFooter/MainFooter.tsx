import React from "react";
import styles from "./MainFooter.module.scss";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export namespace MainFooter {
  export type Props = {};
}

export function MainFooter(props: MainFooter.Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <FooterSocials />
        <a href="mailto:support@personaverse.com" className={styles.support}>
          Contact support
        </a>
      </div>
    </div>
  );
}

const socials = [
  {
    icon: faFacebook,
    url: "https://www.facebook.com/profile.php?id=100094220500581",
    ariaLabel: "Go to Facebook",
  },
  {
    icon: faInstagram,
    url: "https://www.instagram.com/thepersonaverse/",
    ariaLabel: "Go to Instagram",
  },
  {
    icon: faTiktok,
    url: "https://www.tiktok.com/@thepersonaverse",
    ariaLabel: "Go to TikTok",
  },
];

const FooterSocials = () => (
  <div className={styles.socials}>
    {socials.map((s, i) => (
      <a
        key={i}
        href={s.url}
        aria-label={s.ariaLabel}
        target="_blank"
        rel="noreferrer"
      >
        <FontAwesomeIcon className={styles.icon} icon={s.icon} />
      </a>
    ))}
  </div>
);
