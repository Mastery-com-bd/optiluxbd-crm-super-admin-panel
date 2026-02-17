"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipComponent from "@/components/ui/TooltipComponent";
import { assignRole, removeRole } from "@/service/rolesAndPermission";
import { TRoles } from "@/types/roles.types";
import { toast } from "sonner";
import AssignRoleModal from "./AssignRoleModal";
import { Dispatch, SetStateAction, useState } from "react";
import { formatLabel } from "@/utils/textFormatFunction";

type TRoleDropdownProps = {
  hasRole: boolean;
  role: string;
  id: number;
  roleId: number;
  trimmedRole: string;
  roles: TRoles[];
};

const RoleDropdown = ({
  hasRole,
  id,
  role,
  roleId,
  trimmedRole,
  roles,
}: TRoleDropdownProps) => {
  const [loading, setLoading] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const [isAssign, setIsAsign] = useState(false);

  const handleAssignUser = async (
    roleId: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    const data: { userId: number } = {
      userId: id,
    };
    const toastId = toast.loading("assigning role to user...");
    try {
      setLoading(true);
      const result = await assignRole(roleId.toString(), data);

      if (result?.success) {
        toast.success(result.message, { id: toastId });
        setOpen(false);
        setLoading(false);
      } else {
        toast.error(result?.message, { id: toastId });
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const handleRemoveUser = async () => {
    const data: { userId: number } = {
      userId: id,
    };
    const toastId = toast.loading("removing role to user...");
    try {
      const result = await removeRole(roleId.toString(), data);

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
  const formatedRole = formatLabel(role);
  const formatedTrimRole = formatLabel(trimmedRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="cursor-pointer text-xs p-1 rounded-lg effect w-full">
          {role ? (
            <TooltipComponent
              name={formatedRole}
              trimedName={formatedTrimRole}
            />
          ) : (
            "No Role"
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="bg-white/5 backdrop-blur-3xl z-20"
      >
        {hasRole ? (
          <>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsRemove(true);
              }}
              className="cursor-pointer"
            >
              Remove Role
            </DropdownMenuItem>
            <AssignRoleModal
              handleRemove={handleRemoveUser}
              loading={loading}
              setLoading={setLoading}
              acceptButtonName="Remove"
              title="Want to remove this user?"
              description="If you want to remove this role from this user..."
              open={isRemove}
              setOpen={setIsRemove}
            />
          </>
        ) : (
          <>
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setIsAsign(true);
              }}
              className="cursor-pointer"
            >
              Assign Role
            </DropdownMenuItem>
            <AssignRoleModal
              handleAssign={handleAssignUser}
              loading={loading}
              setLoading={setLoading}
              title="Assign a role to this user"
              description="select a role which is perfect for the user and usable for all of its permissions"
              acceptButtonName="Assign"
              roles={roles}
              open={isAssign}
              setOpen={setIsAsign}
            />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default RoleDropdown;
