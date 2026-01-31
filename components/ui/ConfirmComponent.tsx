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
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { rejectUser } from "@/service/user";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import ButtonComponent from "./ButtonComponent";
import { Plus } from "lucide-react";

const formSchema = z.object({
  reason: z.string().min(1, "reason must be at least 1 character."),
});

export type TReason = z.infer<typeof formSchema>;

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
  type?: string;
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
  type,
}: TDeleteProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TReason>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TReason) => {
    setLoading(true);
    console.log("Reason:", data.reason);
    const toastId = toast.loading("Rejecting user...");

    try {
      const result = await rejectUser(data as TReason, Number(id));
      if (result?.success) {
        toast.success(result.message, { id: toastId });
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

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

      {type === "reject" ? (
        <DialogContent className="w-96">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <DialogHeader className="flex flex-row items-center justify-between mt-4">
                <DialogTitle className="text-xl font-semibold text-white">
                  Write Reason
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Write Reason</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Write reason..."
                          {...field}
                          className="effect outline-none rounded-lg p-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ButtonComponent
                  icon={Plus}
                  type="submit"
                  varient="yellow"
                  buttonName="Save"
                  className="h-10 px-6 rounded-2xl"
                />
              </div>
            </form>
          </Form>
        </DialogContent>
      ) : (
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
      )}
    </Dialog>
  );
};

export default ConfirmComponent;
