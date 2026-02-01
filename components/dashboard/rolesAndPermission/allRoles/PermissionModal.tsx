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
        <button className="cursor-pointer bg-transparent px-2 py-1 text-sm hover:bg-gray-700 rounded-lg">
          View Permission
        </button>
      </DialogTrigger>

      <DialogContent className="px-6 w-[40vw] max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar z-50">
        <DialogHeader>All Permission</DialogHeader>
        <AllPermission permissions={permissions} />
      </DialogContent>
    </Dialog>
  );
};

export default PermissionModal;
