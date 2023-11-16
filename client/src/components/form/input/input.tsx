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
  register: UseFormRegister<T>;
  rules: RegisterOptions;
  name: Path<T>;
  errors: Partial<DeepMap<T, FieldError>>;
}

export const Input = <T extends FieldValues>({
  value,
  id,
  register,
  rules,
  errors,
  name,
}: Props<T>) => {
  return (
    <div className="input-group">
      <input
        type="text"
        className="input"
        value={value}
        id={id}
        {...(register && register(name, rules))}
      />
      <ErrorMessage
        errors={errors}
        name={name as any}
        render={({ message }) => (
          <motion.p
            className="input__error"
            initial={{ y: -16 }}
            animate={{ y: 0 }}
          >
            {message}
          </motion.p>
        )}
      />
    </div>
  );
};
