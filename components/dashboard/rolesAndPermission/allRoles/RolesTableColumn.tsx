/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { TRoles } from "@/types/roles.types";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import PermissionModal from "./PermissionModal";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import ActionDropdown from "@/components/ui/ActionDropdown";
import { deleteRole } from "@/service/rolesAndPermission";

export const RoleTableColumn = (): ColumnDef<TRoles>[] => [
  {
    id: "name",
    header: "name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimedName = name.length > 16 ? name.slice(0, 16) + "..." : name;
      return <TooltipComponent name={name} trimedName={trimedName} />;
    },
  },

  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original?.description;
      const trimedName =
        description.length > 30
          ? description.slice(0, 30) + "..."
          : description;
      return <TooltipComponent name={description} trimedName={trimedName} />;
    },
  },

  {
    accessorKey: "isSystemRole",
    header: "System Role",
    cell: ({ row }) => {
      const status = row.original?.isSystemRole;
      return (
        <Badge variant={status ? "default" : "secondary"}>
          {status ? "Yes" : "No"}
        </Badge>
      );
    },
  },

  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const { creationDate, creationTime } = convertDate(
        new Date(row.original?.created_at),
      );

      return (
        <h1 className="flex flex-col items-start">
          <span>{creationDate}</span>
          <span>{creationTime}</span>
        </h1>
      );
    },
  },

  {
    id: "action",
    header: "Action",
    cell: ({ row }) => {
      const id = row.original?.id;
      const permissions = row.original?.permissions.map(
        (item) => item?.permission,
      );

      const handleDelete = async (
        id: string,
        setOpen: Dispatch<SetStateAction<boolean>>,
        setLoading: Dispatch<SetStateAction<boolean>>,
      ) => {
        setLoading(true);
        const toastId = toast.loading("role deleting", { duration: 3000 });
        try {
          const result = await deleteRole(id);
          if (result?.success) {
            toast.success(result?.message, { id: toastId, duration: 3000 });
            setLoading(false);
            setOpen(false);
          } else {
            toast.error(result?.message, { id: toastId, duration: 3000 });
            setLoading(false);
          }
        } catch (error: any) {
          console.log(error);
          setLoading(false);
        }
      };

      return (
        <ActionDropdown
          id={id.toString()}
          path={`/dashboard/roles/${row.original?.id}`}
          handleDelete={handleDelete}
        >
          <PermissionModal permissions={permissions} />
        </ActionDropdown>
      );
    },
  },
];
