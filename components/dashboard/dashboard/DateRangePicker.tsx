"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { usePathname, useRouter } from "next/navigation";

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const router = useRouter();
  const pathName = usePathname();

  const handleApply = () => {
    if (!startDate || !endDate) return;
    const startDateFormated = format(startDate, "yyyy-MM-dd");
    const endDateFormated = format(endDate, "yyyy-MM-dd");
    const params = new URLSearchParams();
    params.set("startDate", startDateFormated);
    params.set("endDate", endDateFormated);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleResetRevenew = () => {
    setStartDate(undefined);
    setEndDate(undefined);
    router.push(`${pathName}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          {startDate && endDate
            ? `${format(startDate, "yyyy-MM-dd")} → ${format(endDate, "yyyy-MM-dd")}`
            : "Select date range"}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white/5 backdrop-blur-2xl p-4 flex flex-col gap-4"
      >
        <div className="flex gap-4">
          {/* Start Date */}
          <div className=" rounded-xl p-3">
            <p className="mb-2 font-medium text-sm">Start Date</p>
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => {
                setStartDate(date ?? undefined);
                if (date && endDate && endDate < date) setEndDate(undefined);
              }}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={new Date().getFullYear()}
              disabled={{
                after: new Date(),
              }}
              defaultMonth={startDate || new Date()}
              className="rounded-xl bg-white/10 backdrop-blur-3xl"
            />
          </div>

          {/* End Date */}
          <div className="rounded-xl p-3">
            <p className="mb-2 font-medium text-sm">End Date</p>
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={setEndDate}
              captionLayout="dropdown"
              fromYear={2020}
              toYear={new Date().getFullYear()}
              disabled={{
                after: new Date(),
                before: startDate ?? new Date(2020, 0, 1),
              }}
              defaultMonth={endDate || startDate || new Date()}
              className="rounded-xl bg-white/10 backdrop-blur-3xl"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button size="sm" variant="outline" onClick={handleResetRevenew}>
            Reset
          </Button>

          <Button
            size="sm"
            disabled={!startDate || !endDate}
            onClick={handleApply}
          >
            Apply
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateRangePicker;
