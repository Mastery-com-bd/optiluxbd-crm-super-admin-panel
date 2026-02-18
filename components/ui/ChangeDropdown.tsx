"use client";

import { formatLabel } from "@/utils/textFormatFunction";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu";

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer text-xs p-1 rounded-lg effect w-full">
          {value ? formatLabel(value) : placeholder}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/5 backdrop-blur-3xl z-20"
      >
        {options.map((option) => (
          <DropdownMenuItem
            key={option}
            onClick={() => onChange(option)}
            className="text-xs cursor-pointer"
          >
            {formatLabel(option)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChangeDropdown;
