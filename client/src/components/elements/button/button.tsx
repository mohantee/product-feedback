import "./button.css";
import { ReactElement } from "react";

interface Props {
  type: "primary" | "secondary" | "accent" | "alert" | "blank";
  name: string;
  icon?: ReactElement;
  transition?: "underline" | "opacity";
}

export function Button(props: Props) {
  const { icon, type, name, transition = "opacity" } = props;
  return (
    <button
      className="btn text-white-400 fs-heading-100 flex"
      data-type={type}
      data-transition={transition}
    >
      {icon}
      {name}
    </button>
  );
}
