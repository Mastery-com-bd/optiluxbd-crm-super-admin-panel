/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { TBroadcast } from "@/types/broadcast.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import CornerGlowSvg from "@/components/svgIcon/button/CornerGlowSvg";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, SquarePen } from "lucide-react";
import { toast } from "sonner";
import { createBroadcast } from "@/service/broadcast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  title: z
    .string({ message: "title is required" })
    .min(1, "Title must be at least 1 character."),
  message: z
    .string({ message: "message is required" })
    .min(1, "Mrssage must be at least 1 character."),
  priority: z.enum(["LOW", "NORMAL", "HIGH", "URGENT"], "priority is required"),
});

type TCreateBroadCast = z.infer<typeof formSchema>;

const CreateBroadcast = ({ broadcast }: { broadcast?: TBroadcast }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TCreateBroadCast>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: broadcast?.title ?? "",
      message: broadcast?.message ?? "",
      priority: broadcast?.priority ?? "LOW",
    },
  });

  const onSubmit = async (data: TCreateBroadCast) => {
    const toastId = toast.loading("creating broadcast...", { duration: 3000 });
    try {
      let result;
      if (broadcast) {
        result = "update plan";
      } else {
        result = await createBroadcast(data);
      }

      if (result?.success) {
        toast.success(result?.message, { id: toastId, duration: 3000 });
        form.reset();
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId, duration: 3000 });
      }
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong", { id: toastId, duration: 3000 });
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) form.reset();
        setOpen(isOpen);
      }}
    >
      <DialogTrigger asChild>
        {broadcast ? (
          <button className=" w-7 h-7 p-1.5 rounded-[12px] effect cursor-pointer">
            <SquarePen size={16} className="text-[#58E081]" />
          </button>
        ) : (
          <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Create Broadcast</span>
            </p>
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <CornerGlowSvg />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-15 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                {broadcast ? "Update Plan" : "Create A New Plan"}
              </DialogTitle>

              <ButtonComponent
                icon={Plus}
                type="submit"
                varient="yellow"
                buttonName="Save"
                className="h-10 px-6 rounded-2xl"
              />
            </DialogHeader>

            <div className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" font-normal text-white">
                      Broadcast Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter plan name"
                        className="effect border-none rounded-lg text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Select Priority</FormLabel>
                <Controller
                  name="priority"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {["LOW", "NORMAL", "HIGH", "URGENT"].map((item, i) => {
                          const formatted =
                            item.charAt(0).toUpperCase() +
                            item.slice(1).toLowerCase();

                          return (
                            <SelectItem key={i} value={item}>
                              {formatted}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  )}
                />
                {form.formState.errors.priority && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.priority.message}
                  </p>
                )}
              </div>

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Write Message..."
                        {...field}
                        className="effect outline-none rounded-lg p-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBroadcast;
