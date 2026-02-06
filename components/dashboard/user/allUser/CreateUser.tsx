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
import { createUser, TCreateUserData, updateUser } from "@/service/user";
import { TRoles } from "@/types/roles.types";
import { TUserData } from "@/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Plus, X } from "lucide-react";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const baseSchema = {
  name: z.string().min(1, "Name must be at least 1 character."),
  email: z
    .string({ message: "email is required" })
    .email({ message: "enter a valid email address" }),
  roleId: z.string({ message: "role is required" }),
  phone: z
    .string({ message: "Phone is required" })
    .min(10, "phone must be at least 10 character."),
  status: z.enum(
    ["ACTIVE", "INACTIVE", "SUSPENDED", "DISABLED", "REJECTED"],
    "status is required",
  ),
  is_approved: z.boolean().optional(),
  is_active: z.boolean().optional(),
  email_verified: z.boolean().optional(),
};

const passwordSchema = {
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include at least one uppercase letter")
    .regex(/[a-z]/, "Must include at least one lowercase letter")
    .regex(/[0-9]/, "Must include at least one number")
    .regex(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Must include at least one special character",
    ),
};

const getFormSchema = (hasUser: boolean) =>
  z.object(hasUser ? baseSchema : { ...baseSchema, ...passwordSchema });

export const passwordRules = [
  { label: "Min 8 characters", regex: /^.{8,}$/ },
  { label: "At least 1 uppercase letter", regex: /[A-Z]/ },
  { label: "At least 1 lowercase letter", regex: /[a-z]/ },
  { label: "At least 1 number", regex: /[0-9]/ },
  { label: "At least 1 special character", regex: /[!@#$%^&*(),.?\":{}|<>]/ },
];

const CreateUser = ({ user, roles }: { user?: TUserData; roles: TRoles[] }) => {
  const formSchema = getFormSchema(!!user);

  type TCreateUser = z.infer<z.ZodObject<typeof baseSchema>> & {
    password?: string;
  };
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const [passwordtext, setPasswordText] = useState("");

  console.log(user);

  const form = useForm<TCreateUser>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      roleId: user?.roles[0]?.roleId?.toString(),
      phone: user?.phone || "",
      status: user?.status || "ACTIVE",
      is_approved: user?.is_approved ?? true,
      is_active: user?.is_active ?? true,
      email_verified: user?.email_verified ?? true,
    },
  });

  const onSubmit = async (data: TCreateUser) => {
    const payload = {
      ...data,
      roleId: Number(data?.roleId),
    };
    const toastId = toast.loading("creating user...");

    try {
      let result;
      if (user) {
        result = await updateUser(payload, user?.id);
      } else {
        result = await createUser(payload as TCreateUserData);
      }

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
        {user ? (
          <button className=" cursor-pointer">Update</button>
        ) : (
          <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Create User</span>
            </p>
            <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
              <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
            </div>
            <CornerGlowSvg />
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[40vw] max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                {user ? "Update User" : "Create A New User"}
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
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        User Name
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
                        User Email
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
                        User Phone
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

                {!user && (
                  <div>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel className="text-xs font-normal text-white">
                            Password
                          </FormLabel>

                          <div className="relative">
                            <FormControl>
                              <Input
                                type={visible ? "text" : "password"}
                                placeholder="Enter password"
                                className="bg-white/10 border-none rounded-lg text-white pr-10"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                  setPasswordText(e.target.value);
                                  setTouched(true);
                                }}
                                onBlur={() => {
                                  field.onBlur();
                                  setTouched(true);
                                }}
                              />
                            </FormControl>

                            <button
                              type="button"
                              onClick={() => setVisible(!visible)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#514D6A]"
                            >
                              {visible ? (
                                <Eye size={18} />
                              ) : (
                                <EyeOff size={18} />
                              )}
                            </button>
                          </div>

                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    {touched && (
                      <div className="space-y-1 mt-2">
                        {passwordRules
                          .filter(
                            (rule) => !rule.regex.test(passwordtext || ""),
                          )
                          .map((rule) => (
                            <div
                              key={rule.label}
                              className="flex items-center gap-2 text-sm"
                            >
                              <X size={14} className="text-red-700" />
                              <span className="text-[#514D6A]">
                                {rule.label}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <FormLabel>Select Status</FormLabel>
                  <Controller
                    name="status"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          {[
                            "ACTIVE",
                            "INACTIVE",
                            "SUSPENDED",
                            "DISABLED",
                            "REJECTED",
                          ].map((item, i) => {
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
                  {form.formState.errors.status && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.status.message}
                    </p>
                  )}
                </div>

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

              <div className="flex items-center justify-between gap-6">
                {/* Boolean Flags */}
                <div className="flex items-center w-full">
                  {[
                    { name: "is_approved", label: "Approved" },
                    { name: "email_verified", label: "Email Verified" },
                    { name: "is_active", label: "Active" },
                  ].map((fieldItem) => (
                    <div key={fieldItem.name} className="w-full">
                      <FormField
                        control={form.control}
                        name={fieldItem.name as keyof TCreateUser}
                        render={({ field }) => (
                          <FormItem className="flex items-center ">
                            <Input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={!!field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              onBlur={field.onBlur}
                              name={field.name}
                              ref={field.ref}
                            />
                            <FormLabel className="text-xs font-normal text-white w-full">
                              {fieldItem.label}
                            </FormLabel>
                            <FormMessage className="text-xs" />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUser;
