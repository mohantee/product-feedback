import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { FaCheck, FaChevronDown } from "react-icons/fa";
import "./dropdown.css";
import { Dispatch, ReactElement, SetStateAction } from "react";

interface Props {
  ariaLabel: string;
  value: string;
  onValueChange: Dispatch<SetStateAction<any>>;
  trigger?: ReactElement;
  values: string[];
}

export function Dropdown(props: Props) {
  const { values, ariaLabel, value, onValueChange, trigger } = props;

  const defaultTrigger = (
    <div className="dropdown__trigger">
      <input
        className="dropdown__input-field"
        role="combobox"
        type="text"
        value={value}
        onChange={() => {}}
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
        <DropdownMenu.Content align="start" className="dropdown__content">
          <DropdownMenu.RadioGroup value={value} onValueChange={onValueChange}>
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
}
