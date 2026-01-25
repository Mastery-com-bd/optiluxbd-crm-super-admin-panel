'use client'
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import PieChartSection from "./PieChartSection";
import BarChartSection from "./BarChartSection";
import { useState } from "react";

const RevenueSection = () => {
  const START_YEAR = 2020;
  const CURRENT_YEAR = new Date().getFullYear();
  const years = Array.from({ length: CURRENT_YEAR - START_YEAR + 1 }, (_, i) =>
    String(START_YEAR + i)
  );
  const [year, setYear] = useState(years[years.length - 1]);
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const pieData = [
    { name: "Processing", color: "bg-[#1EAAE7]" },
    { name: "Cancelled", color: "bg-[#FF7A30]" },
    { name: "Returned", color: "bg-[#6418C3]" },
    { name: "Pending", color: "bg-brand" },
    { name: "Deliveried", color: "bg-success" },
  ];

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-3 lg:gap-6 my-6">
      {/* bar chart component */}
      <Card className="effect h-full relative rounded-3xl px-6 py-6 w-full border-0">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl space-y-4">
          {/* header section */}
          <div className="flex items-center justify-between">
            <h1 className="text-xl text-white/70">Total revenue</h1>
            <div className="flex items-center gap-6">
              {/* status drodpown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="flex items-center text-[14px] effect font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                  >
                    <p className="flex items-center gap-2">
                      <span className="text-[14px]">{year}</span>
                      <ChevronDown size={18} />
                    </p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/5 backdrop-blur-2xl"
                >
                  {years.map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setYear(item);
                        setFilters((prev) => ({
                          ...prev,
                          limit: Number(item),
                          page: 1,
                        }));
                      }}
                      className={item === year ? "font-medium" : ""}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          {/* main content */}
          <BarChartSection />
        </div>
      </Card>

      {/* pie chart component */}
      <Card className="effect border-0 h-full relative rounded-3xl px-6 py-4 w-full">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl ">
          <PieChartSection />
          <div className="w-full flex justify-center ">
            <div className="grid grid-cols-2 space-x-10">
              {pieData.map((item, i) => (
                <p key={i} className="flex items-center gap-1">
                  <span className={`h-4 w-4 rounded-full ${item.color}`} />
                  <span className="text-text-secondary font-medium">
                    {item.name}
                  </span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RevenueSection;