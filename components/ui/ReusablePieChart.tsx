/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Label, Pie, PieChart, Sector } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "./chart";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { useMemo } from "react";

type TPieChartProps<DataItem extends Record<string, any>> = {
  id: string;
  chartData: DataItem[];
  activeCategoryKey: keyof DataItem;
  valueKey: keyof DataItem;
  nameKey: keyof DataItem;
  activeCategory: DataItem[keyof DataItem];
};

const ReusablePieChart = <DataItem extends Record<string, any>>({
  id,
  chartData,
  valueKey,
  nameKey,
  activeCategoryKey,
  activeCategory,
}: TPieChartProps<DataItem>) => {
  const chartConfig = {
    Referral: { label: "Referral", color: "#1EAAE7" },
    Organic: { label: "Organic", color: "#FF7A30" },
    Facebook: { label: "Facebook", color: "#6418C3" },
    "Cold Call": { label: "Cold Call", color: "var(--success)" },
    LinkedIn: { label: "LinkedIn", color: "var(--brand)" },
  } satisfies ChartConfig;

  const activeIndex = useMemo(
    () =>
      chartData.findIndex((item) => item[activeCategoryKey] === activeCategory),
    [chartData, activeCategory, activeCategoryKey]
  );

  return (
    <>
      <ChartStyle id={id} config={chartConfig} />
      <ChartContainer
        id={id}
        config={chartConfig}
        className=" aspect-square w-full p-0 shadow-none bg-transparent"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <g>
            <circle
              cx="50%"
              cy="50%"
              r={70}
              className="fill-white/10 stroke-white/20"
              strokeWidth={2}
            />
          </g>
          <Pie
            data={chartData}
            dataKey={valueKey as string}
            nameKey={nameKey as string}
            stroke="none"
            innerRadius={100}
            activeIndex={activeIndex}
            activeShape={({
              cx = 0,
              cy = 0,
              midAngle = 0,
              innerRadius = 0,
              outerRadius = 0,
              fill,
              startAngle,
              endAngle,
            }: PieSectorDataItem) => {
              const RADIAN = Math.PI / 180;
              const radialOffset = 4;
              const innerExtra = 30;
              const outerExtra = 18;
              const strokeWidth = 6;
              const strokeColor = "#fff";
              const offsetX = radialOffset * Math.cos(-midAngle * RADIAN);
              const offsetY = radialOffset * Math.sin(-midAngle * RADIAN);

              const newCx = cx + offsetX;
              const newCy = cy + offsetY;
              const finalInnerRadius = innerRadius - innerExtra;
              const finalOuterRadius = outerRadius + outerExtra;

              return (
                <g>
                  {/* 1. Enlarged fill — offset সহ */}
                  <Sector
                    cx={newCx}
                    cy={newCy}
                    innerRadius={finalInnerRadius}
                    outerRadius={finalOuterRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                    stroke="none"
                  />

                  {/* 2. White stroke — সবশেষে render → সবার উপরে থাকবে */}
                  <Sector
                    cx={newCx}
                    cy={newCy}
                    innerRadius={finalInnerRadius}
                    outerRadius={finalOuterRadius + strokeWidth / 2}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={strokeWidth}
                  />
                </g>
              );
            }}
          >
            <Label
              content={({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox && "cy" in viewBox))
                  return null;

                const activeItem = chartData[activeIndex];

                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-foreground text-3xl"
                  >
                    {activeItem.value.toFixed(0)}%
                  </text>
                );
              }}
            />
          </Pie>

          {/* ✅ Center overlay circle — drawn LAST */}
        </PieChart>
      </ChartContainer>
    </>
  );
};

export default ReusablePieChart;
