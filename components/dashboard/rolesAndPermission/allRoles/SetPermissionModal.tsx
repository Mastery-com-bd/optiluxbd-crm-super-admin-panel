/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { setPermission } from "@/service/rolesAndPermission";
import { TPermission } from "@/types/permission.types";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

type TSetPermissionsModalProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  permissions: TPermission[];
  rolePermissions: TPermission[];
  roleId: number;
};

const SetPermissionModal = ({
  open,
  setOpen,
  permissions,
  rolePermissions,
  roleId,
}: TSetPermissionsModalProps) => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    rolePermissions.map((p) => p.key) || [],
  );

  const handleToggle = (key: string) => {
    setSelectedKeys((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      return updated;
    });
  };

  const handleSave = async () => {
    const payload = {
      permissionKeys: selectedKeys,
    };
    const toastId = toast.loading("...assigning permission to role", {
      duration: 3000,
    });
    try {
      const result = await setPermission(roleId.toString(), payload);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSelectedKeys(rolePermissions.map((p) => p.key));
        }
      }}
    >
      <DialogContent className="px-6 w-[40vw] max-w-150 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto z-50">
        <DialogHeader>
          <DialogTitle>Set Permissions</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="space-y-3">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between rounded-md border border-white/10 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">
                    {permission.name}
                  </p>
                  <p className="text-xs text-white/60">
                    {permission.description}
                  </p>
                </div>

                <Switch
                  checked={selectedKeys.includes(permission.key)}
                  onCheckedChange={() => handleToggle(permission.key)}
                  className={`h-7 w-30 py-1 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-green-700 [&>span]:bg-white! data-[state=checked]:[&>span]:translate-x-4`}
                />
              </div>
            ))}
          </div>
        </DialogDescription>

        <DialogFooter>
          <div className="flex justify-end gap-2 mt-6">
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedKeys(rolePermissions.map((p) => p.key));
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SetPermissionModal;
