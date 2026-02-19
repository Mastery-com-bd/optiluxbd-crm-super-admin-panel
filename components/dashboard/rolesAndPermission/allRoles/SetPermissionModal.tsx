/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { setPermission } from "@/service/rolesAndPermission";
import { TPermission } from "@/types/permission.types";
import { formatLabel } from "@/utils/textFormatFunction";
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
  const [newKeys, setNewKeys] = useState<string[]>([]);

  const handleToggle = (key: string) => {
    setNewKeys((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      return updated;
    });
    setSelectedKeys((prev) => {
      const updated = prev.includes(key)
        ? prev.filter((k) => k !== key)
        : [...prev, key];
      return updated;
    });
  };

  const handleSave = async () => {
    if (!newKeys.length)
      return toast.error("nothing to update", { duration: 3000 });
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
  console.log(permissions);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setSelectedKeys(rolePermissions.map((p) => p.key));
          setNewKeys([]);
        }
      }}
    >
      <DialogContent className="px-6 w-[30vw] effect ">
        <h1>Set Permissions</h1>

        <div className="mt-4 overflow-y-auto no-scrollbar max-h-[20vh] border border-red-700">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between rounded-md border border-white/10 px-2 py-1"
              >
                <div>
                  <p className="text-xs font-medium text-white">
                    {formatLabel(permission?.name)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {permission?.description}
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 overflow-y-auto no-scrollbar">
            {permissions.map((permission) => (
              <div
                key={permission.id}
                className="flex items-center justify-between rounded-md border border-white/10 px-2 py-1"
              >
                <div>
                  <p className="text-xs font-medium text-white">
                    {formatLabel(permission?.name)}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {permission?.description}
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
        </div>

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
      </DialogContent>
    </Dialog>
  );
};

export default SetPermissionModal;
