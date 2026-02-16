import {
  Anchor,
  CircleDollarSign,
  CircleGauge,
  Handbag,
  LucideIcon,
  Notebook,
  Podcast,
  Settings,
  Tag,
  Tv,
  User,
} from "lucide-react";

export interface NavRoute {
  title: string;
  path?: string;
  icon?: LucideIcon;
  roles?: string[];
  permissions?: string[];
  children?: NavRoute[];
}

export const crmRoutes: NavRoute[] = [
  {
    title: "Dashboard",
    icon: CircleGauge,
    path: "/dashboard",
    permissions: ["reports.view"],
  },
  {
    title: "User",
    icon: User,
    path: "/dashboard/user",
    permissions: ["users.manage", "users.manage"],
  },
  {
    title: "Organizations",
    icon: Handbag,
    path: "/dashboard/organizations",
    permissions: ["organizations.view", "organizations.manage"],
  },
  {
    title: "Subscription & Plan",
    icon: Podcast,
    children: [
      // {
      //   title: "All Subscriptions",
      //   path: "/dashboard/subscription",
      //   permissions: ["subscriptions.manage", "subscriptions.view"],
      // },
      {
        title: "All Plans",
        path: "/dashboard/plans",
        permissions: ["plans.manage", "plans.view"],
      },
      {
        title: "Features",
        path: "/dashboard/features",
        permissions: ["plans.manage", "plans.view"],
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
        permissions: ["roles.manage"],
      },
      {
        title: "Permissions",
        path: "/dashboard/permissions",
        permissions: ["permissions.manage"],
      },
    ],
  },
  {
    title: "Logs",
    icon: Anchor,
    children: [
      {
        title: "Activity Logs",
        path: "/dashboard/logs",
        permissions: ["logs.manage"],
      },
    ],
  },
  {
    title: "Coupons",
    icon: Tag,
    path: "/dashboard/coupons",
    permissions: ["coupons.manage"],
  },
  {
    title: "Broadcasts",
    icon: Tv,
    path: "/dashboard/broadcasts",
    permissions: ["broadcasts.manage"],
  },
  {
    title: "Payments",
    icon: CircleDollarSign,
    path: "/dashboard/payments",
    permissions: ["payments.manage"],
  },

  {
    title: "Supports",
    icon: Tv,
    path: "/dashboard/support",
    permissions: ["support.manage"],
  },
  {
    title: "Contents",
    icon: Tv,
    path: "/dashboard/content",
    permissions: ["broadcasts.manage"],
  },

  {
    title: "Settings",
    icon: Settings,
    path: "/dashboard/settings",
    permissions: ["settings.manage"],
  },
];
