import React from "react";
import { HelpModal, TextAccentSecondary } from "@/Components";

export namespace CreateChatHelpModal {
  export type Props = HelpModal.Props & {};
}

export function CreateChatHelpModal(props: CreateChatHelpModal.Props) {
  return (
    <HelpModal {...props} title="Creating Your Chat: A Quick Guide">
      <p>Follow these simple steps to customize your chat experience.</p>

      <ol>
        <li>
          <TextAccentSecondary>Your Chat Companion's Name:</TextAccentSecondary>{" "}
          This is where you determine who you'll be chatting with. You could
          pick the name of a celebrity, a movie character, a sports star, a
          historic figure or even a fictional persona from your imagination!
        </li>
        <li>
          <TextAccentSecondary>
            Enriching Your Chosen Persona (Optional):
          </TextAccentSecondary>{" "}
          Adjust the personality traits and preferences of your chosen character
          to make your conversation more engaging and entertaining. Experiment
          with various options to create a unique experience.
        </li>
      </ol>
    </HelpModal>
  );
}
