"use client";
import { TUsageAnalytics } from "@/types/type.analytics";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import OrganizationCard from "./OrganizationCard";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ChartComponent from "../customComponent/shared/AreaChart";

const UserAnalytics = ({
  usageAnalytics,
}: {
  usageAnalytics: TUsageAnalytics[];
}) => {
  const [date, setDate] = useState("All");
  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-6">
      {/* bar chart component */}
      <Card className="effect h-full relative rounded-3xl px-6 py-6 w-full">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl space-y-4">
          {/* header section */}
          <h1 className="text-xl text-white/70">Popular Organization</h1>
          {/* main content */}
          <div>
            {usageAnalytics.map((usage, i) => (
              <OrganizationCard key={i} usageAnalytics={usage} />
            ))}
          </div>

          <div className="w-full flex items-center relative rounded-3xl effect">
            <Link
              href="/dashboard/organizations"
              className=" w-full py-1 px-4 text-center"
            >
              All Organization
            </Link>
          </div>
        </div>
      </Card>
      {/* area chart component */}
      <Card className="effect border-0 h-full relative rounded-3xl px-6 py-4 w-full">
        {/* main content */}
        <div className=" w-full h-full rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Lead Conversion Funnel</h1>
            <div className="flex items-center gap-6">
              {/* status drodpown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="default"
                    className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                  >
                    <p className="flex items-center gap-2">
                      <span className="text-[14px]">
                        {date === "All" ? "Select Days" : date}
                      </span>
                      <ChevronDown size={18} />
                    </p>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/5 backdrop-blur-2xl"
                >
                  {["7", "14", "21", "30"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setDate(item);
                      }}
                      className={item === date ? "font-medium" : ""}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ChartComponent />
        </div>
      </Card>
    </div>
  );
};

export default UserAnalytics;
