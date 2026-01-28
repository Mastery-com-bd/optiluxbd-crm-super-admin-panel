"use client";
import { SidebarGroup } from "@/components/ui/sidebar";
import { TCrmNavigation } from "@/constants/CRM_Navigation";
import CoreManagement from "./sidebarRoutes/CoreManagement";

export function NavMain({ items }: { items: TCrmNavigation }) {
  return (
    <SidebarGroup className="space-y-2">
      {/* core management */}
      <CoreManagement
        sidebarRoutes={items?.coreManagement}
        platform="Core Management"
      />
    </SidebarGroup>
  );
}
