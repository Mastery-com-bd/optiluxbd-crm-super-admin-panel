/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createRole, updateRole } from "@/service/rolesAndPermission";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { TRoles } from "@/types/roles.types";

const formSchema = z.object({
  name: z
    .string({ message: "name is required" })
    .min(1, "name must be at least 1 character."),
  description: z
    .string({ message: "description is required" })
    .min(1, "description must be at least 1 character."),
});

export type TCreateRole = z.infer<typeof formSchema>;

const CreateRoles = ({ role }: { role?: TRoles }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateRole>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: role?.name || "",
      description: role?.description || "",
    },
  });

  const onSubmit = async (data: TCreateRole) => {
    const toastId = toast.loading("creating role...", { duration: 3000 });
    try {
      let result;
      if (role) {
        result = await updateRole(role?.id.toString(), data);
      } else {
        result = await createRole(data);
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
        {role ? (
          <button className=" cursor-pointer">Update</button>
        ) : (
          <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Create Role</span>
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
                {role ? "Update the role" : "Create A New Role"}
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
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className=" font-normal text-white">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter role name"
                        className="effect border-none rounded-lg text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[10px]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
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

export default CreateRoles;
