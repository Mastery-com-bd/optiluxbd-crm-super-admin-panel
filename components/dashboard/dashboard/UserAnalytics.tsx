"use client";
import { TGrowthReport, TUsageAnalytics } from "@/types/type.analytics";
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
import { usePathname, useRouter } from "next/navigation";

type TUserAnalyticsProps = {
  usageAnalytics: TUsageAnalytics[];
  growth: TGrowthReport[];
};

type TPeriod = "day" | "week" | "month" | "year";

const UserAnalytics = ({ usageAnalytics, growth }: TUserAnalyticsProps) => {
  const [period, setPeriod] = useState<TPeriod>("month");
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = async (item: TPeriod) => {
    const params = new URLSearchParams();
    params.set("period", item);
    router.push(`${pathName}?${params.toString()}`, { scroll: false });
  };

  const handleReset = () => {
    setPeriod("month");
    router.push(`${pathName}`);
  };

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
            <h1 className="text-xl font-semibold">Growth Stats</h1>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                >
                  <p className="flex items-center gap-2 capitalize">
                    <span className="text-[14px]">{period}</span>
                    <ChevronDown size={18} />
                  </p>
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="bg-white/5 backdrop-blur-2xl"
              >
                {["day", "week", "month", "year"].map((item) => (
                  <DropdownMenuItem
                    key={item}
                    onClick={() => {
                      setPeriod(item as typeof period);
                      handleChange(item as TPeriod);
                    }}
                    className={`capitalize cursor-pointer ${
                      item === period ? "font-medium bg-white/10" : "opacity-80"
                    }`}
                  >
                    {item}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
            >
              Reset
            </Button>
          </div>

          <ChartComponent growth={growth} />
        </div>
      </Card>
    </div>
  );
};

export default UserAnalytics;
