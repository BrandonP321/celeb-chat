import React from "react";
import styles from "./Home.module.scss";
import { StartChatForm } from "./components/StartChatForm/StartChatForm";
import { Loc } from "@/Loc";
import {
  AppHelmet,
  Button,
  ButtonLink,
  ButtonsWrapper,
  FeaturedPersona,
  FeaturedPersonasCarousel,
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

const tempImg =
  "https://cdn.discordapp.com/attachments/995431274267279440/1130295330865414164/PeaceKeeper4000_Dumbledore_on_a_dimly_lit_solid_color_backdrop__1fda31b0-ec0e-40cf-8af3-145a52bb08be.png";

const featuredPersonas: FeaturedPersona[] = [
  { name: "Persona 1", img: tempImg },
  { name: "Persona 2", img: tempImg },
  { name: "Persona 3", img: tempImg },
  { name: "Persona 4", img: tempImg },
];

export function Home(props: Home.Props) {
  const { mobile } = useResponsive();

  return (
    <ScrollablePage className={styles.home}>
      <AppHelmet />

      <HomeHero />

      <div>
        <div className={styles.contentWrapper}>
          <PageHeader
            classes={{
              root: classNames(
                styles.centeredHeader,
                styles.header,
                styles.spotlight
              ),
              title: styles.title,
              desc: styles.blurb,
            }}
            title="Spotlight Personas"
            desc={
              "Masterfully designed personas that go beyond standard customizations."
            }
          />
        </div>

        <FeaturedPersonasCarousel
          items={featuredPersonas}
          classes={{ root: styles.featuredCarousel }}
        />
        <HomeSection
          image="/elon_chat.png"
          heading="Discover Your PersonaVerse!"
          blurb="Dive into endless conversations with iconic personas. From historical figures to pop culture icons, you choose who to chat with. At PersonaVerse, the conversation universe is yours to explore!"
        >
          {/* <CreateChatCTA /> */}
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

const CreateChatCTA = () => {
  const { mobile } = useResponsive();

  return (
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
  );
};

const HomeHero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.bg} />
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1>Welcome to PersonaVerse</h1>
          <p className={styles.blurb}>Chat Reimagined</p>
          <CreateChatCTA />
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
