import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TPermission } from "@/types/permission.types";
import { useState } from "react";
import AllPermission from "../allPermission/AllPermission";

const PermissionModal = ({ permissions }: { permissions: TPermission[] }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
          View Permission
        </button>
      </DialogTrigger>

      <DialogContent className="px-6 w-[40vw] max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar z-50">
        <DialogHeader></DialogHeader>
        <AllPermission permissions={permissions} />
      </DialogContent>
    </Dialog>
  );
};

export default PermissionModal;
