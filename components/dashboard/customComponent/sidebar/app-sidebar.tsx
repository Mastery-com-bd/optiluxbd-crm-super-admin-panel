/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Frame, LogOut } from "lucide-react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { TeamSwitcher } from "./team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { crmRoutes } from "@/constants/CRM_Navigation";
import Optilux from "../../../../public/images/OptiluxBD.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import SidebarButtonEffect from "./buttons/ItemButton";
import { logout } from "@/service/authService";
import { useUser } from "@/providers/AuthProvider";
import { TUser } from "@/types/user.types";
import { NavUser } from "./nav-user";
import { usePermission } from "@/providers/PermissionProvider";
// This is sample data.
const data = {
  teams: [
    {
      name: "OpitluxBD",
      logo: () => <Image src={Optilux} alt="Logo" width={24} height={24} />,
      plan: "CRM",
      icon: Frame,
    },
  ],
  navMain: crmRoutes,
  projects: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const { setUser, setIsLoading, user } = useUser();
  const { setUserPermissions, setIsLoading: setPermissionLoading } =
    usePermission();

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res.success) {
        setIsLoading(true);
        setPermissionLoading(true);
        setUser(null);
        setUserPermissions(null);
        toast.success(res?.message, { id: toastId, duration: 3000 });
        router.push("/login");
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      const errorInfo =
        error?.error ||
        error?.data?.message ||
        error?.data?.errors[0]?.message ||
        "Something went wrong!";
      toast.error(errorInfo, { id: toastId, duration: 3000 });
    }
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <div className="flex flex-col justify-between h-full ">
        <div>
          <SidebarHeader className="">
            <TeamSwitcher teams={data?.teams} />
          </SidebarHeader>
          <div className="border border-dashed border-[rgba(255,177,63,0.50)]"></div>

          <SidebarContent>
            <NavMain items={data?.navMain} />
          </SidebarContent>
        </div>

        <SidebarFooter>
          <NavUser user={user as TUser} />
          <SidebarMenuItem key={"logout"} className="w-full">
            <SidebarMenuButton tooltip={"Logout"} asChild className=" px-0">
              <button
                onClick={handleLogOut}
                className="w-full text-left cursor-pointer"
              >
                <SidebarButtonEffect>
                  <div className="relative z-10 flex w-full items-center justify-between px-4 group-data-[collapsible=icon]:p-2 py-1.5">
                    <p className="flex items-center gap-2">
                      <span>
                        <LogOut size={16} />
                      </span>
                      <span className="text-red-600">Logout</span>
                    </p>
                  </div>
                </SidebarButtonEffect>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarFooter>
      </div>
      {/* <SidebarRail /> */}
    </Sidebar>
  );
}
