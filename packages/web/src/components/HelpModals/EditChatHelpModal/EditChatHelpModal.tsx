import {
  HelpModal,
  TextAccentSecondary,
  TextAccentSecondaryLight,
} from "@/Components";
import React from "react";

export namespace EditChatHelpModal {
  export type Props = HelpModal.Props & {};
}

export function EditChatHelpModal(props: EditChatHelpModal.Props) {
  return (
    <HelpModal {...props} title="Editing Your Chat: A Quick Guide">
      <ol>
        <li>
          <TextAccentSecondary>Your Chat Companion's Name:</TextAccentSecondary>{" "}
          Here, you can modify the name of your chat partner. This could be the
          name of a celebrity, movie character, politician, and so on. Remember,
          the name you provide helps shape the AI's responses to align with the
          personality you've chosen. So, choose a name that best represents the
          character you're aiming for.
        </li>
        <li>
          <TextAccentSecondary>
            Describing Your Chosen Persona (Optional):
          </TextAccentSecondary>{" "}
          This field gives you the chance to detail specific personality traits
          or background information about your chosen character. The AI uses
          this description to generate more accurate and context-specific
          responses. For example, if you're chatting with a famous scientist
          character, you might want to mention their most notable theories or
          contributions to science.
        </li>
      </ol>
      <p>
        <TextAccentSecondary>Remember: </TextAccentSecondary>
        The more accurate and specific you are, the better the AI can
        impersonate your chosen character!
      </p>
      <p>
        <TextAccentSecondaryLight>
          Note: Significant changes to your character's name and description may
          cause the character's responses to change, as the AI adapts to the new
          information provided.
        </TextAccentSecondaryLight>
      </p>
    </HelpModal>
  );
}
