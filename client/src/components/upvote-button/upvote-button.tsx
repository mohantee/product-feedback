import * as Toggle from "@radix-ui/react-toggle";
import "./upvote-button.css";
import { FaChevronUp } from "react-icons/fa";

interface Props {
  count: number;
  isPressed: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function UpvoteButton(props: Props) {
  const { count, isPressed, onClick } = props;

  return (
    <Toggle.Root
      className="chip"
      aria-label={`${count} upvotes`}
      pressed={isPressed}
      onClick={onClick}
    >
      <span className="chip__icon">
        <FaChevronUp />
      </span>
      <p className="chip__text ">{count}</p>
    </Toggle.Root>
  );
}
