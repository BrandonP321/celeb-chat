import React from "react";
import styles from "./Home.module.scss";
import { StartChatForm } from "./components/StartChatForm/StartChatForm";
import { Loc } from "@/Loc";
import {
  AppHelmet,
  Button,
  ButtonsWrapper,
  PricingTable,
  ScrollablePage,
} from "@/Components";
import { useResponsive } from "@/Hooks";
import classNames from "classnames";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";

export namespace Home {
  export type Props = {};
}

export function Home(props: Home.Props) {
  return (
    <ScrollablePage className={styles.home}>
      <AppHelmet />

      <HomeHero />

      <div>
        <HomeSection
          image="https://placehold.co/600x400"
          heading="Some heading"
          blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere, justo quis mattis posuere, sem nunc consectetur justo, eget tincidunt dolor nunc vitae mauris."
        >
          <ButtonsWrapper align={BtnAlign.Left}>
            <Button>Some CTA</Button>
          </ButtonsWrapper>
        </HomeSection>

        <HomeSection
          image="https://placehold.co/600x400"
          heading="Some heading2"
          blurb="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In posuere, justo quis mattis posuere, sem nunc consectetur justo, eget tincidunt dolor nunc vitae mauris."
          alignImageLeft
        >
          <ButtonsWrapper align={BtnAlign.Left}>
            <Button>Some CTA</Button>
          </ButtonsWrapper>
        </HomeSection>
      </div>

      <PricingTable classes={{ root: styles.pricingTable }} />
    </ScrollablePage>
  );
}

const HomeHero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1>Welcome to PersonaVerse:</h1>
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
        <h2>{heading}</h2>
        <p className={styles.blurb}>{blurb}</p>
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
