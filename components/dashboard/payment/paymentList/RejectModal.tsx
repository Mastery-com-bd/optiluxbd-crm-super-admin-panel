/* eslint-disable @typescript-eslint/no-explicit-any */
import ConfirmComponent from "@/components/ui/ConfirmComponent";
import { rejectPayment } from "@/service/payment";

import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";

const RejectModal = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(false);

  const handleReject = async (
    id: string,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
  ) => {
    setLoading(true);
    const toastId = toast.loading("payment rejecting", { duration: 3000 });
    try {
      const result = await rejectPayment(id);
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
    <ConfirmComponent
      id={id}
      onChange={handleReject}
      loading={loading}
      setLoading={setLoading}
      buttonName="Reject"
      acceptButtonName="Reject Payment"
      title="Want to Reject this payment?"
      description="If you reject this payment this payment will not be counted as confirmed and it can`t be undone "
    />
  );
};

export default RejectModal;
