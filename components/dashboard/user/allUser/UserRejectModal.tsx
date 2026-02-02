"use client";

import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { rejectUser } from "@/service/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  reason: z.string().min(1, "reason must be at least 1 character."),
});

export type TReason = z.infer<typeof formSchema>;

type TRejectModalProps = {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserRejectModal = ({ id, open, setOpen }: TRejectModalProps) => {
  const form = useForm<TReason>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TReason) => {
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Trigger button */}

      <DialogContent className="px-6 py-4 w-15 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                Write a reason
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
            </div>
            <ButtonComponent
              icon={Plus}
              type="submit"
              varient="yellow"
              buttonName="Save"
              className="h-10 px-6 rounded-2xl"
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserRejectModal;
