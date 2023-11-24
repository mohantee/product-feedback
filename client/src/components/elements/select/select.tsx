import * as Select from "@radix-ui/react-select";
import { FaChevronDown, FaCheck } from "react-icons/fa";
import classnames from "classnames";
import { ReactNode, forwardRef } from "react";
import "./select.css";
import {
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

interface ItemProps {
  children: ReactNode | string;
  value: string;
  disabled?: boolean;
  className?: string;
}

interface MenuProps<T extends FieldValues> {
  options: {
    name: string;
    value: string;
  }[];
  defaultValue: string;
  ariaLabel: string;
  register?: UseFormRegister<T>;
  name: Path<T>;
  children: ReactNode;
  field: ControllerRenderProps<T, Path<T>>;
}

type Ref = HTMLDivElement;

const SelectItem = forwardRef<Ref, ItemProps>(
  ({ children, className, ...props }, forwardedRef) => {
    return (
      <Select.Item
        className={classnames("SelectItem", className)}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <FaCheck className="SelectItemIndicator" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  }
);

export function SelectMenu<T extends FieldValues>(props: MenuProps<T>) {
  const {} = props;
  return (
    <Select.Root
      defaultValue={props.defaultValue}
      onValueChange={props.field.onChange}
      value={props.field.value}
    >
      <Select.Trigger className="SelectTrigger" aria-label={props.ariaLabel}>
        <Select.Value placeholder="Select" />
        <Select.Icon>
          <FaChevronDown className="SelectIcon" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="SelectContent" position="popper">
          <Select.Viewport className="SelectViewport">
            {props.options.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.name}
              </SelectItem>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
