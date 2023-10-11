import { ReactElement } from "react";
import * as Toggle from "@radix-ui/react-toggle";
import "./upvote-button.css";

interface Props {
  text: string;
  icon?: ReactElement;
  isPressed: boolean;
}

export function UpvoteButton(props: Props) {
  const { text, icon, isPressed } = props;
  return (
    <Toggle.Root
      className="chip"
      aria-label={`${text} upvotes`}
      aria-pressed={isPressed}
    >
      <span className="chip__icon">{icon}</span>
      <p className="chip__text ">{text}</p>
    </Toggle.Root>
  );
}
