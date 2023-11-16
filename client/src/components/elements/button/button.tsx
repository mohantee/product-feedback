import "./button.css";
import { ReactElement } from "react";

interface Props {
  status: "primary" | "secondary" | "accent" | "alert" | "blank";
  name: string;
  icon?: ReactElement;
  transition?: "underline" | "opacity";
  onClick: () => void;
}

export function Button(props: Props) {
  const { icon, status, name, transition = "opacity", onClick } = props;
  return (
    <button
      className="btn text-white-400 fs-heading-100 flex"
      data-type={status}
      data-transition={transition}
      onClick={onClick}
      type="submit"
    >
      {icon}
      {name}
    </button>
  );
}
