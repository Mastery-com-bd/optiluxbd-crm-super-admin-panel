/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { CircleCheck, Clock, Frame, LogOut, PhoneCall } from "lucide-react";
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
import Optilux from "../../../public/images/OptiluxBD.png";
import Image from "next/image";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import {
//   currentUser,
//   logOut,
//   TAuthUSer,
// } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";
// import { useLogoutMutation } from "@/redux/features/auth/authApi";
import { toast } from "sonner";
// import { baseApi } from "@/redux/api/baseApi";
// import { getPermissions } from "@/utills/getPermissionAndRole";
import SidebarButtonEffect from "./buttons/ItemButton";
import { logout } from "@/service/authService";
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
  // const user = useAppSelector(currentUser);
  const router = useRouter();
  // const dispatch = useAppDispatch();
  // const [logout] = useLogoutMutation();
  // const user = useAppSelector(currentUser);
  // const { role } = getPermissions(user as TAuthUSer);
  const role = ["Owner"];
  const percent = 50;

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res?.success) {
        // dispatch(logOut());
        // dispatch(baseApi.util.resetApiState());
        toast.success(res?.message, {
          id: toastId,
          duration: 3000,
        });
        router.push("/login");
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
          {/* <NavUser user={user as TAuthUSer} /> */}
          {role.includes("Agent") && (
            <div className="w-full bg-[rgba(255,255,255,0.05)] effect rounded-3xl p-3 space-y-3 group-data-[collapsible=icon]:hidden">
              <div className="flex items-center gap-2">
                <div className="rounded-full border border-[rgba(255,107,0,0.5)] bg-[linear-gradient(135deg,rgba(255,107,0,0.30)_0%,rgba(255,107,0,0.10)_100%)] text-[#FF6B00] p-2">
                  <PhoneCall size={22} />
                </div>
                <h1 className="flex flex-col">
                  <span className="text-base font-bold">Pending Calls</span>
                  <span className="text-xs font-medium text-[#FCF5EB]">
                    2 of 4 left
                  </span>
                </h1>
              </div>
              <div className="space-y-1">
                <p className="flex items-center justify-between">
                  <span className="text-sm">Progress</span>{" "}
                  <span className="text-[#FF6B00] font-semibold">
                    {percent}%
                  </span>
                </p>
                <div className="w-full h-2 rounded-full border border-white/15 bg-transparent overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div className="bg-[rgba(255,255,255,0.03)] flex items-center gap-1.5 px-3 py-1 rounded-xl border border-white/10 w-full">
                  <CircleCheck size={16} className="text-success" />
                  <span className="font-medium">2</span>
                </div>
                <div className="bg-[rgba(255,107,0,0.10)] flex items-center gap-1.5 px-3 py-1 rounded-xl border border-[rgba(255,107,0,0.30)] w-full text-[#FF6B00]">
                  <Clock size={16} />
                  <span className="font-medium">2</span>
                </div>
              </div>
            </div>
          )}
          {/* allert card for agent */}

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
