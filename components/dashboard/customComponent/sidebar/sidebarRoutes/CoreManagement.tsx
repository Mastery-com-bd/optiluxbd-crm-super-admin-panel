import SidebarButtonSvg from "@/components/svgIcon/SidebarButtonSvg";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
// import SubItemButton from "@/components/pages/shared/dashboard/sidebar/buttons/SubItemButton";
import { NavRoute } from "@/constants/CRM_Navigation";
// import { currentUser, TAuthUSer } from "@/redux/features/auth/authSlice";
// import { useAppSelector } from "@/redux/hooks";
// import { getPermissions } from "@/utills/getPermissionAndRole";
// import { getSidebarRoutes } from "@/utills/getSidebarRoutes";
// import { matchRoute } from "@/utills/matchRoute";
import { Minus, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import SidebarButtonEffect from "../buttons/ItemButton";
import SubItemButton from "../buttons/SubItemButton";

type TCoreManagementRoute = {
  sidebarRoutes: NavRoute[];
  platform?: string;
  singleRoute?: NavRoute;
};

const CoreManagement = ({
  sidebarRoutes,
  platform,
  singleRoute,
}: TCoreManagementRoute) => {
  // const user = useAppSelector(currentUser);
  // const { role, permissions } = getPermissions(user as TAuthUSer);
  const pathname = usePathname();
  // const visibleRoutes = getSidebarRoutes(sidebarRoutes, role, permissions);
  const [open, setOpen] = useState(false);
  const isActiveCommunication = pathname === singleRoute?.path;

  return (
    <div>
      {platform && <SidebarGroupLabel>{platform}</SidebarGroupLabel>}

      <SidebarMenu>
        {sidebarRoutes.map((item, i) => {
          const isActive = pathname === item.path;

          if (!item.children || item.children.length === 0) {
            return (
              <SidebarMenuItem key={i} className="w-full">
                {item.path ? (
                  <Link href={item.path}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      asChild
                      className=" px-0"
                    >
                      <button className="w-full text-left cursor-pointer">
                        <SidebarButtonEffect active={isActive}>
                          <div className="relative z-10 flex w-full items-center justify-between px-4 group-data-[collapsible=icon]:p-2 py-1.5">
                            <p className="flex items-center gap-2">
                              <span>
                                {item.icon && <item.icon size={16} />}
                              </span>
                              <span>{item.title}</span>
                            </p>
                          </div>
                        </SidebarButtonEffect>
                      </button>
                    </SidebarMenuButton>
                  </Link>
                ) : (
                  <SidebarMenuButton tooltip={item.title} asChild>
                    <button className="w-full text-left cursor-pointer">
                      <SidebarButtonEffect active={isActive}>
                        <div className="flex items-center gap-2 px-2 py-2">
                          {item.icon && <item.icon size={16} />}
                          <span>{item.title}</span>
                        </div>
                      </SidebarButtonEffect>
                    </button>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            );
          }

          // If the item has children
          return (
            <Collapsible key={i} asChild className="group/collapsible">
              <SidebarMenuItem>
                {singleRoute && (
                  <SubItemButton
                    isActive={isActiveCommunication}
                    subItem={singleRoute}
                  />
                )}
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    className="w-full"
                  >
                    <button className="relative w-full cursor-pointer text-base overflow-hidden rounded-lg group/btn ">
                      {/* Glow SVG */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                        <SidebarButtonSvg />
                      </div>

                      {/* Top-left border */}
                      <div className="pointer-events-none absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />

                      {/* Bottom-right border */}
                      <div className="pointer-events-none absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />

                      {/* Bottom gradient line */}
                      <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                        <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex w-full items-center justify-between px-2 group-data-[collapsible=icon]:p-2 py-2">
                        <p className="flex items-center gap-2">
                          <span>{item.icon && <item.icon size={16} />}</span>
                          <span>{item.title}</span>
                        </p>

                        <p>
                          <Plus
                            size={16}
                            className="transition-all duration-200 group-data-[state=open]/collapsible:hidden"
                          />
                          <Minus
                            size={16}
                            className="hidden transition-all duration-200 group-data-[state=open]/collapsible:block"
                          />
                        </p>
                      </div>
                    </button>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item?.children?.map((subItem, i) => {
                      const isActive = pathname === subItem.path ;
                      const visibleChildrenRoute = subItem?.children;
                      const hasChildren =
                        subItem?.children && subItem?.children.length > 0
                          ? true
                          : false;
                      return (
                        <SidebarMenuSubItem
                          key={i}
                          active={isActive} 
                          hasChildren={hasChildren}
                        >
                          {subItem?.children && subItem?.children.length ? (
                            <SidebarMenu>
                              <Collapsible key={i} asChild>
                                <SidebarMenuItem>
                                  <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                      asChild
                                      tooltip={subItem.title}
                                      hasChildren={hasChildren}
                                    >
                                      <button
                                        className="relative w-full cursor-pointer text-base overflow-hidden rounded-lg group/btn "
                                        onClick={() => setOpen(!open)}
                                      >
                                        {/* Hover glow */}
                                        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                                          <SidebarButtonSvg />
                                        </div>

                                        {/* Borders */}
                                        <div className="pointer-events-none absolute top-0 left-px inset-1.5 border-l border-t border-white/20 rounded-tl-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />

                                        <div className="pointer-events-none absolute bottom-0 right-px inset-1.5 border-r border-b border-white/20 rounded-br-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200" />

                                        {/* Bottom gradient */}
                                        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200">
                                          <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10 flex w-full items-center justify-between pl-1 pr-2 py-2 ">
                                          <p className="flex items-center gap-2">
                                            <span>{subItem.title}</span>
                                          </p>

                                          {/* ✅ Open / close icons */}
                                          <p className="flex items-center">
                                            {open ? (
                                              <Minus size={16} />
                                            ) : (
                                              <Plus size={16} />
                                            )}
                                          </p>
                                        </div>
                                      </button>
                                    </SidebarMenuButton>
                                  </CollapsibleTrigger>

                                  <CollapsibleContent>
                                    <SidebarMenuSub>
                                      {visibleChildrenRoute?.map(
                                        (childItem, index) => {
                                          const isActive = childItem.path
                                            ? true
                                            : false;
                                          return (
                                            <SidebarMenuSubItem
                                              key={index}
                                              active={isActive}
                                            >
                                              <SubItemButton
                                                isActive={isActive}
                                                subItem={childItem}
                                              />
                                            </SidebarMenuSubItem>
                                          );
                                        }
                                      )}
                                    </SidebarMenuSub>
                                  </CollapsibleContent>
                                </SidebarMenuItem>
                              </Collapsible>
                            </SidebarMenu>
                          ) : (
                            <SubItemButton
                              isActive={isActive}
                              subItem={subItem}
                            />
                          )}
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </div>
  );
};

export default CoreManagement;
