"use client";

import { ChartConfig } from "@/components/ui/chart";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReusablePieChart from "../ui/ReusablePieChart";

const chartData = [
  { name: "Processing", value: 25, fill: "#1EAAE7" },
  { name: "Cancelled", value: 30, fill: "#FF7A30" },
  { name: "Returned", value: 20, fill: "#6418C3" },
  { name: "Pending", value: 15, fill: "#DE9C3A" },
  { name: "Deliveried", value: 10, fill: "#2BC155" },
];

const chartConfig = {
  Processing: { label: "Processing", color: "#1EAAE7" },
  Cancelled: { label: "Cancelled", color: "#FF7A30" },
  Returned: { label: "Returned", color: "#6418C3" },
  Pending: { label: "Pending", color: "var(--success)" },
  Deliveried: { label: "Deliveried", color: "var(--brand)" },
} satisfies ChartConfig;

const PieChartSection = () => {
  const [activeCategory, setActiveCategory] = useState(chartData[0].name);
  const categories = useMemo(() => chartData.map((item) => item.name), []);
  return (
    <div className="space-y-3">
      {/* header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl text-white/80 w-full">Order Status Ratio</h1>
        <Select value={activeCategory} onValueChange={setActiveCategory}>
          <SelectTrigger
            className="w-36 h-6 rounded-lg px-2 py-1"
            aria-label="Select Source"
          >
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent
            align="end"
            className="rounded-xl bg-white/10 backdrop-blur-2xl"
          >
            {categories.map((key) => {
              const config = chartConfig[key as keyof typeof chartConfig];
              if (!config) return null;

              const color =
                chartData.find((d) => d.name === key)?.fill ?? "#000";

              return (
                <SelectItem
                  key={key}
                  value={key}
                  className="rounded-lg [&_span]:flex"
                >
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className="flex h-3 w-3 shrink-0 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                    {config.label}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <ReusablePieChart
        id="pie-revenew"
        chartData={chartData}
        valueKey="value"
        nameKey="name"
        activeCategoryKey="name"
        activeCategory={activeCategory}
      />
    </div>
  );
};

export default PieChartSection;
