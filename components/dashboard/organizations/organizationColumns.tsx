"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Organization } from "@/types/organizations";
import Image from "next/image";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface ColumnProps {
  handleToggleSuspend: (id: number, currentStatus: boolean) => void;
  setSelectedOrg: (org: Organization) => void;
  setIsUpdateModalOpen: (open: boolean) => void;
  setDeleteProductId: (id: number) => void;
  setDeleteDialogOpen: (open: boolean) => void;
}

export const getOrganizationColumns = ({
  handleToggleSuspend,
  setSelectedOrg,
  setIsUpdateModalOpen,
  //   setDeleteProductId,
  //   setDeleteDialogOpen,
}: ColumnProps): ColumnDef<Organization>[] => [
    {
      accessorKey: "name",
      header: "ORGANIZATION",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <Image
            src="https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
            alt={row.original.name}
            width={48}
            height={48}
            className="w-12 h-12 rounded-lg object-cover"
          />
          <div>
            <p className="font-medium">{row.original.name}</p>
            <p className="text-xs text-muted-foreground">@{row.original.slug}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "email",
      header: "EMAIL",
      cell: ({ row }) => <div className="text-center">{row.original.email}</div>,
    },
    {
      accessorKey: "plan",
      header: "PLAN",
      cell: ({ row }) => (
        <div className="text-center">
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
            {row.original.plan}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "planExpiresAt",
      header: "PLAN EXPIRES",
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.planExpiresAt
            ? new Date(row.original.planExpiresAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            })
            : "N/A"}
        </div>
      ),
    },
    {
      accessorKey: "isSuspended",
      header: "IS SUSPENDED",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Switch
            checked={row.original.isSuspended}
            onCheckedChange={() => handleToggleSuspend(row.original.id, row.original.isSuspended)}
            className={`${row.original.isSuspended
              ? "data-[state=checked]:bg-red-600"
              : "data-[state=unchecked]:bg-green-600"
              }`}
          />
          <span
            className={`text-xs font-bold ${row.original.isSuspended ? "text-red-600" : "text-green-600"
              }`}
          >
            {row.original.isSuspended ? "SUSPENDED" : "ACTIVE"}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "_count.users",
      header: "USERS",
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.original._count.users}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "CREATED AT",
      cell: ({ row }) => (
        <div className="text-center font-semibold">
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: "ACTIONS",
      cell: ({ row }) => (
        <div className="text-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              <MoreVertical className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[180px]">
              <Link href={`/dashboard/organizations/${row.original.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  <Eye className="w-4 h-4 mr-2" /> View
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onSelect={(e) => {
                  e.preventDefault();
                  setSelectedOrg(row.original);
                  setIsUpdateModalOpen(true);
                }}
                className="cursor-pointer"
              >
                <Pencil className="w-4 h-4 mr-2" />
                Update
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              {/* <DropdownMenuItem
              onClick={() => {
                setDeleteProductId(row.original.id);
                setDeleteDialogOpen(true);
              }}
              className="cursor-pointer text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </DropdownMenuItem> */}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];