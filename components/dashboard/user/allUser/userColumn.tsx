"use client";
import { Badge } from "@/components/ui/badge";
import ChangeDropdown from "@/components/ui/ChangeDropdown";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { updateUserStatus } from "@/service/user";
import { TStatus, TUserData } from "@/types/user.types";
import { convertDate } from "@/utils/convertDate";
import { ColumnDef } from "@tanstack/react-table";
import { toast } from "sonner";
import UserActionDropdown from "./UserActionDropdown";
import RoleDropdown from "./RoleDropdown";
import { TRoles } from "@/types/roles.types";

export const userTableColumn = (roles: TRoles[]): ColumnDef<TUserData>[] => [
  {
    id: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.original?.name;
      const trimedName = name.length > 10 ? name.slice(0, 10) + "..." : name;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={name} trimedName={trimedName} />
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const email = row.original?.email;
      const trimedEmail =
        email.length > 10 ? email.slice(0, 10) + "..." : email;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={email} trimedName={trimedEmail} />
        </div>
      );
    },
  },
  {
    id: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const phone = row.original?.phone;
      const trimedName = phone.length > 8 ? phone.slice(0, 8) + "..." : phone;
      return (
        <div className=" flex items-center gap-2">
          <TooltipComponent name={phone} trimedName={trimedName} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original?.status;
      const userId = row.original?.id;

      const handleChange = async (status: TStatus) => {
        const data = {
          status: status,
        };

        const toastId = toast.loading("updating user status...");
        try {
          const result = await updateUserStatus(data, userId);
          if (result?.success) {
            toast.success(result.message, { id: toastId });
          } else {
            toast.error(result?.message, { id: toastId });
          }
        } catch (err) {
          console.log(err);
          toast.error("Something went wrong", { id: toastId });
        }
      };

      return (
        <ChangeDropdown
          value={status as TStatus}
          options={
            [
              "ACTIVE",
              "INACTIVE",
              "SUSPENDED",
              "DISABLED",
              "REJECTED",
            ] as TStatus[]
          }
          onChange={handleChange}
        />
      );
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const allRoles = row.original?.roles ?? [];
      const hasRole = allRoles.length > 0;
      const userRoles = allRoles.map((role) => role?.role?.name);
      const aRole = userRoles[0] || "";
      const trimmedRole = aRole.length > 6 ? aRole.slice(0, 6) + "..." : aRole;
      return (
        <div className=" flex items-center gap-2">
          <RoleDropdown
            hasRole={hasRole}
            id={row.original?.id}
            role={aRole}
            trimmedRole={trimmedRole}
            roleId={row.original?.roles[0]?.role?.id}
            roles={roles}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Active",
    cell: ({ row }) => {
      const active = row.original?.is_active;
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "is_approved",
    header: "Approved",
    cell: ({ row }) => {
      const active = row.original?.is_approved;
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {active ? "Yes" : "No"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "email_verified",
    header: "Verify Email",
    cell: ({ row }) => {
      const emailVerified = row.original?.email_verified;
      return (
        <Badge variant={emailVerified ? "default" : "secondary"}>
          {emailVerified ? "Yes" : "No"}
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

      return <UserActionDropdown id={id} />;
    },
  },
];
