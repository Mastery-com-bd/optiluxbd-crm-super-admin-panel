'use client'
import { ArrowUpRight, Box, Briefcase, User } from "lucide-react";
import { OverviewCard } from "../shared/overviewCard";


export default function DashboardOverview() {
    const stats = [
  {
    icon: Box,
    label: "Active Agent",
    value: "128",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
  {
    icon: User,
    label: "New Leads",
    value: "512",
    change: "36.8",
    isPositive: false,
    highlight: false,
  },
  {
    icon: Briefcase,
    label: "Total Sales",
    value: "6812",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
  {
    icon: ArrowUpRight,
    label: "Total Orders",
    value: "8565",
    change: "36.8",
    isPositive: true,
    highlight: false,
  },
];
    return (
        <div>
            <OverviewCard stats={stats}/>
        </div>
    )
}
