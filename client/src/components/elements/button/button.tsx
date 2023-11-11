import "./button.css";
import { ReactElement } from "react";

interface Props {
  type: "primary" | "secondary" | "accent" | "alert" | "blank";
  name: string;
  icon?: ReactElement;
  transition?: "underline" | "opacity";
  onClick: () => void;
}

export function Button(props: Props) {
  const { icon, type, name, transition = "opacity", onClick } = props;
  return (
    <button
      className="btn text-white-400 fs-heading-100 flex"
      data-type={type}
      data-transition={transition}
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
}
