"use client";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import DeleteComponent from "./DeleteComponent";
import ConfirmComponent from "./ConfirmComponent";

type TDropdownProps = {
  id: string;
  path?: string;
  type?: string;
  handleDelete: (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  children?: ReactNode;
};

const ActionDropdown = ({
  id,
  path,
  type,
  handleDelete,
  children,
}: TDropdownProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only ">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white/5 backdrop-blur-3xl">
        {path && (
          <DropdownMenuItem asChild>
            <Link href={path} className="cursor-pointer">
              Details
            </Link>
          </DropdownMenuItem>
        )}
        {children && <DropdownMenuItem asChild>{children}</DropdownMenuItem>}

        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600"
          onClick={(e) => e.preventDefault()}
        >
          {type ? (
            <ConfirmComponent
              id={id}
              onChange={handleDelete}
              loading={loading}
              setLoading={setLoading}
            />
          ) : (
            <DeleteComponent
              id={id}
              onDelete={handleDelete}
              loading={loading}
              setLoading={setLoading}
            />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionDropdown;