import * as Toggle from "@radix-ui/react-toggle";
import "./tag.css";

interface Props {
  isPressed: boolean;
  text: "All" | "UI" | "UX" | "Enhancement" | "Bug" | "Feature";
  onClick?: (e: any) => void;
}

export function Tag(props: Props) {
  const { isPressed, text, onClick } = props;

  return (
    <Toggle.Root pressed={isPressed} className="tag" onClick={onClick}>
      <p className="tag__text">{text}</p>
    </Toggle.Root>
  );
}
