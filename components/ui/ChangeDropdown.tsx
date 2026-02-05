"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

type ChangeDropdownProps<T extends string> = {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void | Promise<void>;
  placeholder?: string;
};

const ChangeDropdown = <T extends string>({
  value,
  options,
  onChange,
  placeholder = "Select",
}: ChangeDropdownProps<T>) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="px-1 py-1 text-sm cursor-pointer">
        <SelectValue placeholder={placeholder} className="text-sm" />
      </SelectTrigger>

      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option} className="cursor-pointer">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ChangeDropdown;
