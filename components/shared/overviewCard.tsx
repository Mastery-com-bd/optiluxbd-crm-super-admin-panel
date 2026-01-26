"use client";
import { ArrowDownIcon, ArrowUpIcon, LucideIcon } from "lucide-react";
import { useState } from "react";

const timeFilters = ["1D", "7D", "1M", "6M", "1Y"];

interface OverviewCardProps {
  stats: {
    icon: LucideIcon;
    label: string;
    value: string;
    isPositive?: boolean;
    change?: string;
    highlight?: boolean;
    highlightColor?: string;
  }[];
}

export function OverviewCard({ stats }: OverviewCardProps) {
  const [activeFilter, setActiveFilter] = useState("1M");

  return (
    <div className="effect p-6 rounded-4xl">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-xl font-semibold">Overview</h2>

        {/* Time Filters */}
        <div className="flex items-center gap-1 p-1">
          {timeFilters.map((filter, idx) => (
            <button
              key={idx}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-sm font-semibold text-white rounded-[21px]  ${activeFilter == filter ? "overviewButtonEffect" : "text-[#F3F3F3]"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className=" flex flex-col gap-6">
            {/* Icon */}
            <div className="w-16 h-16 bg-transparent! flex justify-center items-center effect rounded-full">
              <stat.icon className="w-6 h-6 text-gray-300 " />
            </div>
            <div className="">
              <p
                className={`text-lg font-semibold  mb-2 ${stat.highlight ? `${stat.highlightColor ? stat.highlightColor : "text-[#58E081]"}` : "text-white"}`}
              >
                {stat.label}
              </p>

              {/* Value */}
              <p
                className={`text-[50px] leading-[1.2] font-normal ${stat.highlight ? `${stat.highlightColor ? stat.highlightColor : "text-[#58E081]"}` : "text-white"
                  } mb-3`}
              >
                {stat.value}
              </p>

              {/* Change */}
              {stat.change && (
                <div className="flex items-center gap-2">
                    <div className={`flex justify-center items-center px-2 py-1.5 gap-1 effectBlack bg-transparent rounded-xl ${stat?.isPositive ? "bg-[#00A6560D]!" : "bg-[#FF6A550D]!"}`}>
                      {stat.isPositive ? (
                        <div>
                          {stat?.isPositive ? (
                            <ArrowUpIcon className="w-3 h-3" />
                          ) : (
                            <ArrowDownIcon className="w-3 h-3" />
                          )}
                        </div>
                      ) : null}
                      <span
                        className={`${stat?.isPositive ? "text-[#00A656]" : "text-[#FF6A55]"
                          }`}
                      >
                        {stat.change}
                      </span>{" "}
                      %
                    </div>
                  <span className="text-[#EBEBEB] text-sm">vs last year</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
