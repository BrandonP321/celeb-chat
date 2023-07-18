import React from "react";
import styles from "./Home.module.scss";
import { StartChatForm } from "./components/StartChatForm/StartChatForm";
import { Loc } from "@/Loc";
import {
  AppHelmet,
  Button,
  ButtonLink,
  ButtonsWrapper,
  PageHeader,
  PricingTable,
  ScrollablePage,
} from "@/Components";
import { useResponsive } from "@/Hooks";
import classNames from "classnames";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { RouteHelper } from "utils/RouteHelper";
import { faComments } from "@fortawesome/pro-solid-svg-icons";

export namespace Home {
  export type Props = {};
}

export function Home(props: Home.Props) {
  const { mobile } = useResponsive();

  return (
    <ScrollablePage className={styles.home}>
      <AppHelmet />

      <HomeHero />

      <div>
        <HomeSection
          image="/elon_chat.png"
          heading="Discover Your PersonaVerse!"
          blurb="Dive into endless conversations with iconic personas. From historical figures to pop culture icons, you choose who to chat with. At PersonaVerse, the conversation universe is yours to explore!"
        >
          <ButtonsWrapper align={!mobile ? BtnAlign.Left : BtnAlign.Right}>
            <ButtonLink
              to={RouteHelper.Chats()}
              classes={{ root: styles.startChattingCta }}
              variant="secondaryGradient"
              rightIcon={faComments}
              withSheen
            >
              Create your first chat now
            </ButtonLink>
          </ButtonsWrapper>
        </HomeSection>
      </div>

      <div className={styles.contentWrapper}>
        <PageHeader
          classes={{
            root: styles.header,
            desc: styles.desc,
            title: styles.title,
          }}
          title="Unlock Your PersonaVerse Experience"
          desc="More features, more personas, more immersion. Explore the possibilities!"
        />
      </div>
      <PricingTable classes={{ root: styles.pricingTable }} />
    </ScrollablePage>
  );
}

const HomeHero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1>Welcome to PersonaVerse</h1>
          <p className={styles.blurb}>Chat Reimagined</p>
        </div>
      </div>
    </div>
  );
};

type HomeSectionProps = React.PropsWithChildren<{
  image: string;
  heading: string;
  blurb: string;
  alignImageLeft?: boolean;
}>;

const HomeSection = (props: HomeSectionProps) => {
  const { blurb, heading, image, children, alignImageLeft } = props;

  const { mobile } = useResponsive();

  return (
    <div
      className={classNames(
        styles.homeSection,
        alignImageLeft && styles.alignImageLeft
      )}
      style={{ backgroundImage: mobile ? `url(${image})` : undefined }}
    >
      <div className={styles.content}>
        <h2 className={styles.title}>{heading}</h2>
        <p className={classNames(styles.blurb)}>{blurb}</p>
        {children}
      </div>
      <div className={styles.desktopImgWrapper}>
        <div
          className={styles.desktopImg}
          style={{ backgroundImage: mobile ? undefined : `url(${image})` }}
        />
      </div>
    </div>
  );
};
