"use client";
import { Card } from "@/components/ui/card";
import PieChartSection from "./PieChartSection";
import BarChartSection from "./BarChartSection";
import { TRevenewSection } from "@/types/type.analytics";
import DateRangePicker from "../../dashboard/DateRangePicker";

const RevenueSection = ({ reveneu }: { reveneu: TRevenewSection[] }) => {
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
            <DateRangePicker />
          </div>
          {/* main content */}
          <BarChartSection reveneu={reveneu} />
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
