/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import PageHeader from "@/components/shared/pageHeader";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { setPermission } from "@/service/rolesAndPermission";
import { TPermission } from "@/types/permission.types";
import { formatLabel } from "@/utils/textFormatFunction";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type TUserPermissionProps = {
  permissions: TPermission[];
  userPermissions: TPermission[];
  id: number;
};

const UserPermissions = ({
  permissions,
  userPermissions,
  id,
}: TUserPermissionProps) => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState<string[]>(
    userPermissions.map((p) => p.key) || [],
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
      const result = await setPermission(id.toString(), payload);
      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <div className="space-y-4">
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => router.back()}
      >
        <ArrowLeft />
      </Button>

      <div className="flex items-center justify-between ">
        <PageHeader
          title="Your Permissions"
          description="Your role permissions are here with all the permissions so that you can set new permissions from here"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[80vh]! overflow-y-auto flex-1 pr-1">
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
              className="h-7 w-12 cursor-pointer data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-green-700 [&>span]:bg-white data-[state=checked]:[&>span]:translate-x-5"
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end gap-3 pt-3 border-t border-white/10">
        <Button
          variant="ghost"
          onClick={() => {
            setSelectedKeys(userPermissions.map((p) => p.key));
          }}
          className="cursor-pointer"
        >
          Reset
        </Button>

        <Button onClick={handleSave} className="cursor-pointer">
          Save
        </Button>
      </div>
    </div>
  );
};

export default UserPermissions;
