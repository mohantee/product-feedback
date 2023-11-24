import "./input.css";
import {
  DeepMap,
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { motion } from "framer-motion";
import { ErrorMessage } from "@hookform/error-message";

interface Props<T extends FieldValues> {
  value?: string;
  id: string;
  register?: UseFormRegister<T>;
  rules: RegisterOptions;
  name: Path<T>;
  errors: Partial<DeepMap<T, FieldError>>;
  defaultValue?: string;
}

export const Input = <T extends FieldValues>({
  value,
  id,
  register,
  rules,
  errors,
  name,
  defaultValue,
}: Props<T>) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="input"
        value={value}
        id={id}
        {...(register && register(name, rules))}
        data-error={errors[name]?.message ? true : false}
        defaultValue={defaultValue}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => {
          return (
            <motion.div
              className="input__error"
              initial={{ y: -16 }}
              animate={{ y: 0 }}
              role="alert"
              aria-label={message}
            >
              {message}
            </motion.div>
          );
        }}
      />
    </div>
  );
};
