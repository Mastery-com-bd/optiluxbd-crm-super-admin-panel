"use client";

import { cn } from "@/lib/utils";

export function Input({
  className,
  sku,
  type,
  icon,
  borderRadius = "16px",
  ...props
}: React.ComponentProps<"input"> & {
  icon?: React.ReactNode;
  borderRadius?: string;
  sku?:string;
}) {
  return (
    <div className=" effect flex items-center gap-3 px-4 py-2   bg-white/10 backdrop-blur-3xl rounded-[12px] focus-within:border-white/30 focus-within:shadow-md transition-[box-shadow,border-color]">
      {/* <Search className="w-6 h-6 text-[#8a8a96] shrink-0" strokeWidth={1.5} /> */}
      {icon && (
        <span className="flex items-center shrink-0 text-[#8a8a96] w-4 h-4">
          {icon}
        </span>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          " bg-transparent text-[#9a9aa6] placeholder-[#8a8a96] text-base font-light outline-none"
        )}
        {...props}
      />
    </div>
  );
}
