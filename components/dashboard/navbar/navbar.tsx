/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import { NotificationBell } from "@/components/notification/NotificationBell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { useUser } from "@/providers/AuthProvider";
import { logout } from "@/service/authService";
// import { baseApi } from "@/redux/api/baseApi";
// import { useLogoutMutation } from "@/redux/features/auth/authApi";
// import {
//   currentUser,
//   logOut,
//   TAuthUSer,
// } from "@/redux/features/auth/authSlice";
// import { useAppDispatch, useAppSelector } from "@/redux/hooks";
// import { getPermissions } from "@/utills/getPermissionAndRole";
import { ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Navbar: React.FC = () => {
  // const { setTheme } = useTheme();
  const { state } = useSidebar();
  // const user = useAppSelector(currentUser);
  // const dispatch = useAppDispatch();
  // const [logout] = useLogoutMutation();
  const router = useRouter();
  const [inputValue, setInputValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const { setUser, setIsLoading } = useUser();

  // const { role } = getPermissions(user as TAuthUSer);
  const handleSearch = async (val: any) => {
    // setFilters({ ...filters, search: val });
    console.log(val);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    const toastId = toast.loading("logging out", { duration: 3000 });
    try {
      const res = await logout();
      if (res.success) {
        setIsLoading(true);
        setUser(null);
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
    <header
      className={`sticky top-0 z-50 flex h-16 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 rounded-b-xl ${
        scrolled
          ? "bg-white/5 backdrop-blur-2xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      {state === "collapsed" && <SidebarTrigger />}
      <div
        className={`w-full flex items-center justify-between gap-2 ${
          scrolled ? "px-4" : "px-0"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-2">
          <div className="relative">
            <Input
              className="px-10 py-1.5 w-64 text-sm bg-transparent"
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                handleSearch(e.target.value);
              }}
              placeholder="Search "
            />
          </div>
          <div className="flex items-center gap-4">
            {/* <NotificationBell /> */}
            <Popover>
              <PopoverTrigger asChild className="bg-transparent">
                <button className="flex items-center gap-4 text-sm font-medium text-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all duration-200 cursor-pointer p-2 rounded-lg ">
                  <Avatar className="w-10 h-10 rounded-lg">
                    <AvatarImage
                      src={
                        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                      }
                    />
                    <AvatarFallback className="bg-linear-to-br from-primary/20 to-primary/40 text-primary-foreground">
                      BI
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-foreground">
                      {/* {user?.name} */} super admin
                    </span>
                    <span className="text-xs text-muted-foreground/70">
                      {/* {role
                        .map(
                          (r) =>
                            r.charAt(0).toUpperCase() + r.slice(1).toLowerCase()
                        )
                        .join(", ")} */}
                      SUPER ADMIN
                    </span>
                  </div>
                  <span>
                    <ChevronDown className="w-5 h-5" />
                  </span>
                </button>
              </PopoverTrigger>
              <PopoverContent
                className="w-56 p-2 bg-white/5 backdrop-blur-2xl"
                align="end"
              >
                <div className="flex items-center gap-3 px-2 py-2">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                      }
                    />
                    <AvatarFallback>BI</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold"> user.name</p>
                    <p className="text-xs text-muted-foreground">
                      {/* {user?.email} */} email:
                    </p>
                  </div>
                </div>
                <hr className="my-2" />
                <Link
                  href="/dashboard/profile"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  Profile
                </Link>
                <Link
                  href="/dashboard/analysis/settings"
                  className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  My Settings
                </Link>
                <hr className="my-2" />
                <button
                  onClick={handleLogOut}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  Log out
                </button>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
