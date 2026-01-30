"use client";

import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Button } from "./button";

type TDeleteProps = {
  onChange: (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  id: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const ConfirmComponent = ({
  onChange,
  id,
  loading,
  setLoading,
}: TDeleteProps) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        <button className="cursor-pointer w-full flex items-center justify-start text-white">
          Approve
        </button>
      </DialogTrigger>

      {/* Dialog content */}
      <DialogContent className="w-37.5">
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            If you confirm this, the payment will be confirmed from the pending
            status to paid status
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="default"
            disabled={loading}
            onClick={() => {
              onChange(id, setOpen, setLoading);
            }}
            className="cursor-pointer"
          >
            Confirm Approve
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmComponent;
