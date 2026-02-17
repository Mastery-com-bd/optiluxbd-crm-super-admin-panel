"use client";

import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TRevenewSection } from "@/types/type.analytics";
import { formatMonthLabel } from "@/utils/formatMonthLabel";

const BAR_COLORS = ["#FFB13F", "#3A63DE", "#9C3ADE"];

const chartConfig = {
  number: { label: "Revenue" },
} satisfies ChartConfig;

const BarChartSection = ({ reveneu }: { reveneu: TRevenewSection[] }) => {
  const chartData = reveneu?.map((item) => ({
    month: formatMonthLabel(item?.month),
    number: item?.amount,
  }));
  const barSize =
    chartData?.length <= 12
      ? 35
      : chartData?.length <= 24
        ? 24
        : chartData?.length <= 48
          ? 16
          : 10;

  return (
    <div className="w-full overflow-x-auto">
      <ChartContainer config={chartConfig} className="min-w-fit">
        <BarChart
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
            fontSize={12}
            tickFormatter={(v) => (v >= 1000 ? `${v / 1000}k` : v)}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Bar dataKey="number" barSize={barSize} radius={[12, 12, 12, 12]}>
            {chartData?.map((_, index) => (
              <Cell key={index} fill={BAR_COLORS[index % BAR_COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default BarChartSection;
