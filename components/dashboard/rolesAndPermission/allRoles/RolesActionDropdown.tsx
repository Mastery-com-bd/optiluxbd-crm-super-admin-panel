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
import { ReactNode, useState } from "react";
import SetPermissionModal from "./SetPermissionModal";

type TDropdownProps = {
  path: string;
  children: ReactNode;
};

const RolesActionDropdown = ({ path, children }: TDropdownProps) => {
  const [open, setOpen] = useState(false);
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
          className="bg-white/5 backdrop-blur-3xl"
        >
          <DropdownMenuItem asChild>
            <Link href={path}>Details</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>{children}</DropdownMenuItem>

          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            className="cursor-pointer"
          >
            Set Permission
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ✅ MODAL MUST LIVE HERE */}
      <SetPermissionModal open={open} setOpen={setOpen} />
    </>
  );
};

export default RolesActionDropdown;
