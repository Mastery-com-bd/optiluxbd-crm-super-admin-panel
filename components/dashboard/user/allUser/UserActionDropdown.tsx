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
import { approveUser, suspendUser } from "@/service/user";
import ConfirmComponent from "@/components/ui/ConfirmComponent";
import UserRejectModal from "./UserRejectModal";

type TDropdownProps = {
  id: number;
};

const UserActionDropdown = ({ id }: TDropdownProps) => {
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
          className="text-red-600 cursor-pointer"
          onSelect={(e) => {
            e.preventDefault();
            setRejectOpen(true);
          }}
        >
          Reject
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
