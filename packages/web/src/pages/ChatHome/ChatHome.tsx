import React from "react";
import styles from "./ChatHome.module.scss";
import {
  AppHelmet,
  Button,
  ButtonLink,
  ButtonsWrapper,
  LoadingContainer,
  PageHeader,
  ScrollablePage,
} from "@/Components";
import { Loc } from "@/Loc";
import { useAppDispatch, useChats, useResponsive } from "@/Hooks";
import { BtnAlign } from "components/Button/ButtonsWrapper/ButtonsWrapper";
import { faMessages, faUserPlus } from "@fortawesome/pro-solid-svg-icons";
import { RouteHelper } from "utils/RouteHelper";
import { Actions } from "@/Slices";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export namespace ChatHome {
  export type Props = {};
}

export function ChatHome(props: ChatHome.Props) {
  const { chats } = useChats();
  const dispatch = useAppDispatch();
  const { mobile } = useResponsive();

  const userHasNoChats = (chats?.length ?? []) === 0;

  const { ViewChats, CreateChat } = Loc.Web.ChatHome;

  return (
    <ScrollablePage className={styles.home}>
      <AppHelmet />

      <LoadingContainer loading={!chats} />

      <PageHeader
        title={Loc.Web.ChatHome.PageTitle}
        desc={Loc.Web.ChatHome.PageDesc}
      />

      <Section
        icon={faUserPlus}
        cta={CreateChat.CTA}
        to={RouteHelper.CreateChat()}
        title={userHasNoChats ? CreateChat.FirstChatHeader : CreateChat.Header}
        desc={userHasNoChats ? CreateChat.FirstChatDesc : CreateChat.Desc}
      />

      {!userHasNoChats && (
        <Section
          icon={faMessages}
          cta={mobile ? ViewChats.CTA : undefined}
          ctaOnClick={() => dispatch(Actions.ChatSidebar.toggle())}
          title={Loc.Web.ChatHome.ViewChats.Header}
          desc={Loc.Web.ChatHome.ViewChats.Desc}
        />
      )}

      {/* // TODO: Add some sort of support section */}
    </ScrollablePage>
  );
}

export namespace Section {
  export type Props = {
    title: string;
    desc: string;
    cta?: string;
    to?: string;
    icon?: IconProp;
    ctaOnClick?: () => void;
  };
}

export function Section(props: Section.Props) {
  const { cta, desc, title, ctaOnClick, to, icon } = props;

  return (
    <>
      <PageHeader
        classes={{ root: styles.section, title: styles.heading }}
        title={title}
        desc={desc}
      />
      <ButtonsWrapper align={BtnAlign.Center}>
        {to && cta && (
          <ButtonLink
            to={to}
            onClick={ctaOnClick}
            classes={{ root: styles.btn }}
            rightIcon={icon}
          >
            {cta}
          </ButtonLink>
        )}

        {!to && cta && (
          <Button
            onClick={ctaOnClick}
            classes={{ root: styles.btn }}
            rightIcon={icon}
          >
            {cta}
          </Button>
        )}
      </ButtonsWrapper>
    </>
  );
}
