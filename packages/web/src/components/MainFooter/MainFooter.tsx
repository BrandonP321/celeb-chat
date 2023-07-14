import React from "react";
import styles from "./MainFooter.module.scss";
import {
  faFacebook,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RouteHelper } from "utils/RouteHelper";
import { Link } from "react-router-dom";

export namespace MainFooter {
  export type Props = {};
}

export function MainFooter(props: MainFooter.Props) {
  return (
    <div className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.upperContent}>
          <FooterSocials />
          <a href="mailto:support@personaverse.com" className={styles.support}>
            Contact support
          </a>
        </div>
        <LegalLinks />
      </div>
    </div>
  );
}

export const socials = [
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

const legalLinks = [
  { text: <>&copy; PersonaVerse {new Date().getFullYear()}</> },
  { text: "Privacy Policy", url: RouteHelper.PrivacyPolicy() },
];

const LegalLinks = () => (
  <div className={styles.legalLinks}>
    {legalLinks.map((l, i) => (
      <>
        {l.url && <Link to={l.url}>{l.text}</Link>}
        {!l.url && <p>{l.text}</p>}
      </>
    ))}
  </div>
);
