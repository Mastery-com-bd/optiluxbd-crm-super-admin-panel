/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { approveUser, deleteUser, suspendUser } from "@/service/user";
import ConfirmComponent from "@/components/ui/ConfirmComponent";
import UserRejectModal from "./UserRejectModal";
import { TRoles } from "@/types/roles.types";
import CreateUser from "./CreateUser";
import { TUserData } from "@/types/user.types";

type TDropdownProps = {
  id: number;
  roles: TRoles[];
  user: TUserData;
};

const UserActionDropdown = ({ id, roles, user }: TDropdownProps) => {
  const [loading, setLoading] = useState(false);
  const [rejectOpen, setRejectOpen] = useState(false);

  const handleApprove = async (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    const toastId = toast.loading("user approve loading", {
      duration: 3000,
    });
    try {
      const result = await approveUser(Number(id));
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

  const handleSuspend = async (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    const toastId = toast.loading("user approve loading", {
      duration: 3000,
    });
    try {
      const result = await suspendUser(Number(id));
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

  const handleDelete = async (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    const toastId = toast.loading("user deleting", {
      duration: 3000,
    });
    try {
      const result = await deleteUser(Number(id));
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 cursor-pointer">
          <span className="sr-only ">Open menu</span>
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-white/5 backdrop-blur-3xl z-20"
      >
        <DropdownMenuItem asChild>
          <Link href={`/dashboard/user/${id}`} className="cursor-pointer">
            Details
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => e.preventDefault()}
        >
          <CreateUser roles={roles} user={user} />
        </DropdownMenuItem>

        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <ConfirmComponent
            id={id.toString()}
            onChange={handleApprove}
            loading={loading}
            setLoading={setLoading}
            buttonName="Approve"
            acceptButtonName="Approve User"
            title="Want to approve this user?"
            description="If you want to approve this user , this user will get the system access to contribute of the system"
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="text-red-600"
          onClick={(e) => e.preventDefault()}
        >
          <ConfirmComponent
            id={id.toString()}
            onChange={handleSuspend}
            loading={loading}
            setLoading={setLoading}
            buttonName="Suspend"
            acceptButtonName="Suspend User"
            title="Want to suspend this user?"
            description="If you want to suspend this user , this user will loss the system access and selected as blocked user"
          />
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setRejectOpen(true);
          }}
        >
          Reject
        </DropdownMenuItem>

        <DropdownMenuItem onClick={(e) => e.preventDefault()}>
          <ConfirmComponent
            id={id.toString()}
            onChange={handleDelete}
            loading={loading}
            setLoading={setLoading}
            buttonName="Delete"
            acceptButtonName="Delete User"
            title="Want to delete this user?"
            description="If you want to delete this user , this user and his all of data will be parmanently removed from the database and it can`t be undone"
          />
        </DropdownMenuItem>

        <UserRejectModal
          id={id.toString()}
          open={rejectOpen}
          setOpen={setRejectOpen}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActionDropdown;
