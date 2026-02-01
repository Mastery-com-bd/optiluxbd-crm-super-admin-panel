"use client";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inviteUser, TCreateUserData } from "@/service/user";
import { TRoles } from "@/types/roles.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const passwordRules = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?\":{}|<>]/ },
];

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  email: z
    .string({ message: "email is required" })
    .email({ message: "enter a valid email address" }),
  roleId: z.string({ message: "role is required" }),
  phone: z
    .string({ message: "Phone is required" })
    .min(10, "phone must be at least 10 character."),
});

type TInviteUser = z.infer<typeof formSchema>;

const InviteUser = ({ roles }: { roles: TRoles[] }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TInviteUser>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: TInviteUser) => {
    const payload = {
      ...data,
      roleId: Number(data?.roleId),
    };
    const toastId = toast.loading("inviting user...");

    try {
      const result = await inviteUser(payload as TCreateUserData);
      if (result?.success) {
        toast.success(result.message, { id: toastId });
        form.reset();
        setOpen(false);
      } else {
        toast.error(result?.message, { id: toastId });
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong", { id: toastId });
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
        <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
          <p className="flex items-center gap-2">
            <Plus size={18} />
            <span className="text-sm text-white">Invite User</span>
          </p>
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </button>
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-37.5 max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                Invite A User
              </DialogTitle>

              <ButtonComponent
                icon={Plus}
                type="submit"
                varient="yellow"
                buttonName="Save"
                className="h-10 px-6 rounded-2xl"
              />
            </DialogHeader>

            <div className="space-y-4">
              {/* Name, Description, and Prices */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter user name"
                          className="bg-white/10 border-none rounded-lg text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter user email"
                          className="bg-white/10 border-none rounded-lg text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Phone
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter user phone"
                          className="bg-white/10 border-none rounded-lg text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Select Roles</FormLabel>
                  <Controller
                    name="roleId"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((item, i) => {
                            const formatted =
                              item?.name.charAt(0).toUpperCase() +
                              item?.name.slice(1).toLowerCase();

                            return (
                              <SelectItem key={i} value={item?.id.toString()}>
                                {formatted}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.roleId && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.roleId.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUser;
