import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import "./dropdown.css";
import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

interface Props<T extends FieldValues> {
  ariaLabel: string;
  value: string;
  onValueChange?: Dispatch<SetStateAction<any>>;
  trigger?: ReactElement;
  values: string[];
  register?: UseFormRegister<T>;
  rules?: RegisterOptions;
  name: Path<T>;
  sideOffset?: number;
}

export const Dropdown = <T extends FieldValues>(props: Props<T>) => {
  const {
    values,
    ariaLabel,
    rules,
    name,
    register,
    value,
    onValueChange,
    trigger,
    sideOffset = 0,
  } = props;

  const defaultTrigger = (
    <div className="dropdown__trigger">
      <input
        className="dropdown__input-field"
        role="combobox"
        type="text"
        value={value}
        aria-label={ariaLabel}
        readOnly
      />
      <FaChevronDown className="dropdown__icon" />
    </div>
  );

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger || defaultTrigger}
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={sideOffset}
          align="start"
          className="dropdown__content"
        >
          <DropdownMenu.RadioGroup
            value={value}
            onValueChange={onValueChange}
            {...(register && register(name, rules))}
          >
            {values.map((option, i) => {
              const lastIndex = values.length - 1;
              return (
                <div key={option}>
                  <DropdownMenu.RadioItem
                    value={option}
                    className="dropdown__item"
                  >
                    {option}
                    <DropdownMenu.ItemIndicator>
                      <FaCheck className="dropdown__indicator" />
                    </DropdownMenu.ItemIndicator>
                  </DropdownMenu.RadioItem>

                  {/* Don't render separator if last item*/}
                  {i !== lastIndex ? (
                    <DropdownMenu.Separator className="dropdown__separator" />
                  ) : null}
                </div>
              );
            })}
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
