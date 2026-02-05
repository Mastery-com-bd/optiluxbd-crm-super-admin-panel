"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import CoreManagement from "./sidebarRoutes/CoreManagement";
import { NavRoute } from "@/constants/CRM_Navigation";

export function NavMain({ items }: { items: NavRoute[] }) {
  return (
    <SidebarGroup className="space-y-2">
      <CoreManagement sidebarRoutes={items} platform="Core Management" />
    </SidebarGroup>
  );
}
