"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", ConversionRate: 0 },
  { month: "February", ConversionRate: 30 },
  { month: "March", ConversionRate: 55 },
  { month: "April", ConversionRate: 60 },
  { month: "May", ConversionRate: 70 },
  { month: "June", ConversionRate: 90 },
  { month: "July", ConversionRate: 65 },
  { month: "August", ConversionRate: 80 },
  { month: "September", ConversionRate: 55 },
  { month: "October", ConversionRate: 95 },
  { month: "November", ConversionRate: 60 },
  { month: "December", ConversionRate: 75 },
];

const chartConfig = {
  desktop: {
    label: "ConversionRate",
    color: "#9A3ADE",
  },
} satisfies ChartConfig;

const ChartComponent = () => {
  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="shadow-none p-0 h-80 w-full"
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid
            vertical={false}
            horizontal={true}
            stroke="#ffffff"
            strokeOpacity={0.5}
            strokeDasharray="5 5"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />

          <YAxis
            tickLine={false}
            axisLine={false}
            width={25}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />

          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />

          <Area
            dataKey="ConversionRate"
            type="natural"
            fill="#9A3ADE"
            fillOpacity={0.09}
            stroke="#9A3ADE"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
};

export default ChartComponent;
