import React from "react";
import styles from "./CreateChatHelpModal.module.scss";
import { HelpModal, TextAccentSecondary } from "@/Components";

export namespace CreateChatHelpModal {
  export type Props = HelpModal.Props & {};
}

export function CreateChatHelpModal(props: CreateChatHelpModal.Props) {
  return (
    <HelpModal {...props} title="Creating Your Perfect Chat">
      <p>Follow these simple steps to customize your chat experience.</p>

      <ol>
        <li>
          <TextAccentSecondary>Select a Personality:</TextAccentSecondary>{" "}
          Choose from a wide range of celebrities, fictional characters, or
          public figures to chat with. Just type in their name and select from
          the suggestions.
        </li>
        <li>
          <TextAccentSecondary>
            Customize Traits (if applicable):
          </TextAccentSecondary>{" "}
          Adjust the personality traits and preferences of your chosen character
          to make your conversation more engaging and entertaining. Experiment
          with various options to create a unique experience.
        </li>
        <li>
          <TextAccentSecondary>
            Set a Conversation Topic (optional):
          </TextAccentSecondary>{" "}
          You can provide an initial topic or question to guide the conversation
          with your chosen character. This helps set the tone and direction for
          your chat.
        </li>
        <li>
          <TextAccentSecondary>Click "Create Chat":</TextAccentSecondary> Once
          you're satisfied with your selections, click the "Create Chat" button
          to start your conversation!
        </li>
        <li>
          <TextAccentSecondary>
            Set a Conversation Topic (optional):
          </TextAccentSecondary>{" "}
          You can provide an initial topic or question to guide the conversation
          with your chosen character. This helps set the tone and direction for
          your chat.
        </li>
        <li>
          <TextAccentSecondary>Click "Create Chat":</TextAccentSecondary> Once
          you're satisfied with your selections, click the "Create Chat" button
          to start your conversation!
        </li>
        <li>
          <TextAccentSecondary>
            Set a Conversation Topic (optional):
          </TextAccentSecondary>{" "}
          You can provide an initial topic or question to guide the conversation
          with your chosen character. This helps set the tone and direction for
          your chat.
        </li>
        <li>
          <TextAccentSecondary>Click "Create Chat":</TextAccentSecondary> Once
          you're satisfied with your selections, click the "Create Chat" button
          to start your conversation!
        </li>
      </ol>
    </HelpModal>
  );
}
