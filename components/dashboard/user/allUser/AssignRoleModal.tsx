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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRoles } from "@/types/roles.types";
import { Dispatch, SetStateAction, useState } from "react";

type TAssignRoleModalProps = {
  handleRemove?: (
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  handleAssign?: (
    value: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => Promise<void>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  acceptButtonName?: string;
  title?: string;
  description?: string;
  roles?: TRoles[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

const AssignRoleModal = ({
  handleRemove,
  handleAssign,
  loading,
  setLoading,
  acceptButtonName,
  title,
  description,
  roles,
  open,
  setOpen,
}: TAssignRoleModalProps) => {
  const [selectedRoleId, setSelectedRoleId] = useState<string>("");
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {roles && roles.length > 0 ? (
        <DialogContent className="w-37.5 z-30">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <p>{description}</p>
            <div className="space-y-2">
              <Label>Select Role</Label>

              <Select
                value={selectedRoleId}
                onValueChange={(value) => setSelectedRoleId(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>

                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role?.id} value={role?.id.toString()}>
                      {role?.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </DialogDescription>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="default"
              disabled={loading}
              onClick={() => {
                handleAssign?.(selectedRoleId, setOpen, setLoading);
              }}
              className="cursor-pointer"
            >
              {acceptButtonName}
            </Button>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent className="w-37.5 z-30">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          <DialogFooter className="flex justify-end gap-2">
            <Button
              variant="default"
              disabled={loading}
              onClick={() => {
                handleRemove?.(setOpen, setLoading);
              }}
              className="cursor-pointer"
            >
              {acceptButtonName}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AssignRoleModal;
