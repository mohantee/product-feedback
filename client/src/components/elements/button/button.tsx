import { ClipLoader } from "react-spinners";
import "./button.css";
import { ReactElement } from "react";

interface Props {
  status: "primary" | "secondary" | "accent" | "alert" | "blank";
  name: string;
  icon?: ReactElement;
  transition?: "underline" | "opacity";
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "reset" | "submit";
  loading?: boolean;
}

export function Button(props: Props) {
  const {
    icon,
    status,
    disabled,
    name,
    type = "submit",
    transition = "opacity",
    onClick,
    loading,
  } = props;
  return (
    <button
      className="btn text-white-400 fs-heading-100 flex"
      data-type={status}
      data-transition={transition}
      onClick={onClick}
      type={type}
      disabled={disabled || loading}
    >
      {loading ? <ClipLoader size="16" color="white" /> : null}
      {icon}
      {name}
    </button>
  );
}
