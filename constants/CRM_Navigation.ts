
import LeadsTitleIcon from "@/components/svgIcon/LeadsTitleIcon";
import {
  ShoppingCart,
  Users,
  CircleGauge,
  UsersRound,
  GitFork,
  PackageCheck,
  FileStack,
  Handbag,
  Contact,
  Phone,
  ChartColumn,
  Info,
  Settings,
  CalendarClock,
  Target,
  CircleUserRound,
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
  dashboard: {
    routes: NavRoute[];
  };
  coreManagement: NavRoute[];
  teamAndSales: NavRoute[];
  deliveryCommunication: {
    routes: NavRoute[];
  };
  analyticsAndSettings: {
    routes: NavRoute[];
  };
  singleRoute?: {
    routes: NavRoute[];
  };
};

export const crmRoutes: TCrmNavigation = {
  dashboard: {
    routes: [
      {
        title: "Dashboard",
        icon: CircleGauge,
        path: "/dashboard",
      },

    ],
  },

  // single route
  singleRoute: {
    routes: [
    ],
  },

  // core management
  coreManagement: [
    {
      title: "Organizations",
      icon: Handbag,
      path: "/dashboard/organizations"
    }
  ],

  // team and sales hub
  teamAndSales: [
  ],

  // delivery and communication
  deliveryCommunication: {
    routes: [
    ],
  },

  // amalytics and settings
  analyticsAndSettings: {
    routes: [
    ],
  },
};
