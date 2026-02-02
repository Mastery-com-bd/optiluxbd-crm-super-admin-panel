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
  onChange?: (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  id: string;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  buttonName?: string;
  acceptButtonName?: string;
  title?: string;
  description?: string;
};

const ConfirmComponent = ({
  onChange,
  id,
  loading,
  setLoading,
  buttonName = "Confirm Approve",
  acceptButtonName = "Approve",
  title = "Are you sure?",
  description = "If you confirm this, the payment will be confirmed from the pending status to paid status",
}: TDeleteProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}
      <DialogTrigger
        asChild
        onClick={(e) => e.stopPropagation()}
        className="z-20"
      >
        <button className="cursor-pointer w-full flex items-center justify-start text-white">
          {buttonName}
        </button>
      </DialogTrigger>

      <DialogContent className="w-37.5">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter className="flex justify-end gap-2">
          <Button
            variant="default"
            disabled={loading}
            onClick={() => {
              onChange?.(id, setOpen, setLoading);
            }}
            className="cursor-pointer"
          >
            {acceptButtonName}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmComponent;
