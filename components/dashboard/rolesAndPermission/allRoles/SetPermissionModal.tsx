"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Dispatch, SetStateAction } from "react";

const SetPermissionModal = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="px-6 w-[40vw] max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar z-50">
        all permission will be here
      </DialogContent>
    </Dialog>
  );
};

export default SetPermissionModal;
