import {
  CircleDollarSign,
  CircleGauge,
  Handbag,
  Notebook,
  Podcast,
  Settings,
  Tag,
  Tv,
} from "lucide-react";
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
        {
          title: "Features",
          path: "/dashboard/features",
        },
      ],
    },
    {
      title: "Roles $ Permission",
      icon: Notebook,
      children: [
        {
          title: "Roles",
          path: "/dashboard/roles",
        },
        {
          title: "Permissions",
          path: "/dashboard/permissions",
        },
      ],
    },
    {
      title: "Coupons",
      icon: Tag,
      path: "/dashboard/coupons",
    },
    {
      title: "Broadcasts",
      icon: Tv,
      path: "/dashboard/broadcasts",
    },
    {
      title: "Payments",
      icon: CircleDollarSign,
      path: "/dashboard/payments",
    },

    {
      title: "Settings",
      icon: Settings,
      path: "/dashboard/settings",
    },
  ],

  // team and sales hub
};
