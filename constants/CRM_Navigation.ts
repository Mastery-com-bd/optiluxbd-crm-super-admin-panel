import { CircleGauge, Handbag, Podcast } from "lucide-react";
import { LucideIcon } from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: string[];
  permissions?: string[];
  children?: NavRoute[];
}

export type TCrmNavigation = {
  coreManagement: NavRoute[];
};

export const crmRoutes: TCrmNavigation = {
  // core management
  coreManagement: [
    {
      title: "Dashboard",
      icon: CircleGauge,
      path: "/dashboard",
    },
    {
      title: "Organizations",
      icon: Handbag,
      path: "/dashboard/organizations",
    },
    {
      title: "Subscription & Plan",
      icon: Podcast,
      children: [
        {
          title: "All Subscriptions",
          path: "/dashboard/subscription",
        },
        {
          title: "All Plans",
          path: "/dashboard/plans",
        },
      ],
    },
  ],

  // team and sales hub
};
