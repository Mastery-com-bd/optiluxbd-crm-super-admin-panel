"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { TPermission } from "@/types/permission.types";
import { TRoles } from "@/types/roles.types";
import CreateRoles from "./CreateRoles";

type TDropdownProps = {
  path: string;
  secondPath: string;
  permissions: TPermission[];
  rolePermissions: TPermission[];
  roleId: number;
  role: TRoles;
};

const RolesActionDropdown = ({ path, secondPath, role }: TDropdownProps) => {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="bg-white/5 backdrop-blur-3xl z-20"
        >
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={path} className="w-full">
              Details
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onSelect={(e) => e.preventDefault()}
          >
            <CreateRoles role={role} />
          </DropdownMenuItem>

          <DropdownMenuItem asChild className="cursor-pointer">
            <Link href={secondPath} className="w-full">
              Set Permission
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default RolesActionDropdown;
