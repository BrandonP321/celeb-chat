import React, { useState } from "react";
import { renderToString } from "react-dom/server";

export enum Color {
  AccentPrimary = "hsl(206, 41%, 50%)",
  AccentPrimaryDark = "hsl(206, 41%, 35%)",
  White = "white",
  Black = "black",
}

const sharedStyles: React.CSSProperties = {
  boxSizing: "border-box",
};

export namespace Link {
  export type Props = React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & {};
}

export function Link({ style, ...props }: Link.Props) {
  return (
    <a
      {...props}
      target={"_blank"}
      style={{
        ...sharedStyles,
        fontSize: "1rem",
        lineHeight: "initial",
        textDecoration: "none",
        fontWeight: "bold",
        padding: "0.75rem 1rem",
        borderRadius: "0.25rem",
        backgroundColor: Color.AccentPrimary,
        transition: "all 0.2s",
        color: Color.White,
        ...style,
      }}
    />
  );
}

export namespace Title {
  export type Props = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {};
}

export function Title({ style, ...props }: Title.Props) {
  return (
    <h1
      {...props}
      style={{
        ...sharedStyles,
        fontSize: "1.5rem",
        marginBottom: "1rem",
        ...style,
      }}
    />
  );
}

export namespace Header {
  export type Props = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {};
}

export function Header({ style, ...props }: Header.Props) {
  return (
    <h2
      {...props}
      style={{
        ...sharedStyles,
        fontSize: "1.25rem",
        ...style,
      }}
    />
  );
}

export namespace Text {
  export type Props = React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > & {};
}

export function Text({ style, ...props }: Text.Props) {
  return (
    <p
      {...props}
      style={{
        ...sharedStyles,
        fontSize: "1rem",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
        ...style,
      }}
    />
  );
}

export const convertJSXToString = (ele: React.ReactElement) =>
  renderToString(ele);
