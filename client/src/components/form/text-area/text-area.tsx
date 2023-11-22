import "./text-area.css";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { motion } from "framer-motion";

interface Props<T extends FieldValues> {
  value?: string;
  id: string;
  register: UseFormRegister<T>;
  name: Path<T>;
  rules: RegisterOptions;
  errors: Partial<DeepMap<T, FieldError>>;
  autoFocus?: boolean;
}

export const TextArea = <T extends FieldValues>({
  value,
  id,
  rules,
  name,
  errors,
  register,
  autoFocus,
}: Props<T>) => {
  return (
    <div className="textarea-group">
      <textarea
        id={id}
        className="textarea"
        value={value}
        rows={4}
        data-error={errors[name]?.message ? true : false}
        {...(register && register(name, rules))}
        autoFocus={autoFocus}
      />

      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <motion.div
            key={"bla"}
            initial={{ y: -16 }}
            animate={{ y: 0 }}
            className="textarea__error"
            role="alert"
            aria-label={message}
          >
            {message}
          </motion.div>
        )}
      />
    </div>
  );
};
