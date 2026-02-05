"use client";
import {
  OverviewCard,
  OverviewCardProps,
} from "@/components/shared/overviewCard";
import { TAnalytics } from "@/types/analutics.types";
import { ArrowUpRight, Briefcase, Building, Podcast } from "lucide-react";

export default function DashboardOverview({
  analytics,
}: {
  analytics: TAnalytics;
}) {
  const stats = [
    {
      icon: Podcast,
      label: "Active Subscription",
      value: analytics?.activeSubscriptions?.toString(),
      change: "36.8",
      isPositive: true,
      highlight: false,
    },
    {
      icon: Building,
      label: "Total Organization",
      value: analytics?.totalOrganizations?.toString(),
      change: "36.8",
      isPositive: false,
      highlight: false,
    },
    {
      icon: Briefcase,
      label: "MRR",
      value: analytics?.mrr?.toString(),
      change: "36.8",
      isPositive: true,
      highlight: false,
    },
    {
      icon: ArrowUpRight,
      label: "Churnrate",
      value: analytics?.churnRate?.toString(),
      change: "36.8",
      isPositive: true,
      highlight: false,
    },
  ];

  return (
    <div>
      <OverviewCard stats={stats as OverviewCardProps[]} />
    </div>
  );
}
