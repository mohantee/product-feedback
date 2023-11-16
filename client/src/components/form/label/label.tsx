import "./label.css";

interface Props {
  htmlFor: string;
  primaryText: string;
  helperText: string;
}

export function Label({ htmlFor, primaryText, helperText }: Props) {
  return (
    <div className="label-group">
      <label htmlFor={htmlFor} className="label">
        {primaryText}
      </label>
      <p className="helper-text">{helperText}</p>
    </div>
  );
}
