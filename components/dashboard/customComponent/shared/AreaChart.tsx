"use client";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TGrowthReport } from "@/types/type.analytics";
import { formatMonthLabel } from "@/utils/formatMonthLabel";

const chartConfig = {
  desktop: {
    label: "ConversionRate",
    color: "#9A3ADE",
  },
} satisfies ChartConfig;

const ChartComponent = ({ growth }: { growth: TGrowthReport[] }) => {
  const chartData = growth.map((item) => ({
    month: formatMonthLabel(item.date),
    ConversionRate: item.count,
  }));

  return (
    <div>
      <ChartContainer
        config={chartConfig}
        className="shadow-none p-0 h-80 w-full"
      >
        <AreaChart
          accessibilityLayer
          data={chartData}
          margin={{ left: 12, right: 12 }}
        >
          <CartesianGrid
            vertical={false}
            horizontal
            stroke="#ffffff"
            strokeOpacity={0.5}
            strokeDasharray="5 5"
          />
          <XAxis
            dataKey="month"
            interval={0}
            fontSize={8}
            tickLine={false}
            angle={-90}
            textAnchor="end"
            height={50}
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
