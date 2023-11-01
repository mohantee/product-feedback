import * as Toggle from "@radix-ui/react-toggle";
import "./tag.css";

interface Props {
  isPressed: boolean;
  text: "UI" | "UX" | "Enhancement" | "Bug" | "Feature";
}

export function Tag(props: Props) {
  const { isPressed, text } = props;

  return (
    <Toggle.Root pressed={isPressed} className="tag">
      <p className="tag__text">{text}</p>
    </Toggle.Root>
  );
}
