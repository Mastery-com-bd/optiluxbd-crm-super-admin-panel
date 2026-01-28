"use client";
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const BAR_COLORS = ["#FFB13F", "#3A63DE", "#9C3ADE"];

// Single source of truth (month + value together)
const chartData = [
  { month: "Jan", number: 1200 },
  { month: "Feb", number: 1500 },
  { month: "Mar", number: 900 },
  { month: "Apr", number: 1700 },
  { month: "May", number: 1100 },
  { month: "Jun", number: 1400 },
  { month: "Jul", number: 1300 },
  { month: "Aug", number: 1600 },
  { month: "Sep", number: 1000 },
  { month: "Oct", number: 1800 },
  { month: "Nov", number: 1250 },
  { month: "Dec", number: 1550 },
];

const chartConfig = {
  number: {
    label: "Overview",
  },
} satisfies ChartConfig;

const BarChartSection = () => {
  return (
    <div className="w-full ">
      <ChartContainer config={chartConfig} className="shadow-none ">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid
            vertical={false}
            stroke="#FFFFFF"
            strokeDasharray="6 6"
            strokeOpacity={0.5}
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine
            interval={0}
            fontSize={12}
            height={20}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            domain={[0, 2000]}
            ticks={[0, 500, 1000, 1500, 2000]}
            fontSize={12}
            width={40}
            tickFormatter={(value) =>
              value >= 1000 ? `${value / 1000}k` : value
            }
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          {/* 🎯 Color cycles based on index */}
          <Bar dataKey="number" barSize={35} radius={[15, 15, 15, 15]}>
            {chartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={BAR_COLORS[index % BAR_COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartSection;
