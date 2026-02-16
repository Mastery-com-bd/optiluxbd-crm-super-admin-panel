/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createBroadcast } from "@/service/broadcast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Organization } from "@/types/organizations";

const formSchema = z.object({
  title: z
    .string({ message: "title is required" })
    .min(1, "Title must be at least 1 character."),
  message: z
    .string({ message: "message is required" })
    .min(1, "Mrssage must be at least 1 character."),
  type: z.enum(
    ["INFO", "WARNING", "MAINTENANCE", "URGENT"],
    "type is required",
  ),
  expiresAt: z.string().optional(),
  organizationIds: z.array(z.number()).optional(),
});

export type TCreateBroadCast = z.infer<typeof formSchema>;

type TorganizationProps = {
  organizations: Organization[];
};

const CreateBroadcast = ({ organizations }: TorganizationProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TCreateBroadCast>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
      type: "INFO",
      expiresAt: "",
      organizationIds: [],
    },
  });

  const onSubmit = async (data: TCreateBroadCast) => {
    const toastId = toast.loading("creating broadcast...", { duration: 3000 });
    try {
      const result = await createBroadcast(data);
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
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-15 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <DialogHeader className="flex flex-row items-center justify-between mt-4">
              <DialogTitle className="text-xl font-semibold text-white">
                Create A New Plan
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
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <FormLabel>Select Priority</FormLabel>
                  <Controller
                    name="type"
                    control={form.control}
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                          {["INFO", "WARNING", "MAINTENANCE", "URGENT"].map(
                            (item, i) => {
                              const formatted =
                                item.charAt(0).toUpperCase() +
                                item.slice(1).toLowerCase();

                              return (
                                <SelectItem key={i} value={item}>
                                  {formatted}
                                </SelectItem>
                              );
                            },
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {form.formState.errors.type && (
                    <p className="text-sm text-destructive">
                      {form.formState.errors.type.message}
                    </p>
                  )}
                </div>

                <FormField
                  control={form.control}
                  name="expiresAt"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="font-normal text-white">
                        Expire Date
                      </FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full text-left rounded-lg bg-white/10 border-none text-white"
                            >
                              {field.value
                                ? format(new Date(field.value), "dd MMM yyyy")
                                : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={(date) => {
                                if (date) {
                                  field.onChange(date.toISOString());
                                }
                              }}
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
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
              <FormField
                control={form.control}
                name="organizationIds"
                render={({ field }) => {
                  const selectedIds = field.value || [];

                  const toggleSelectAll = () => {
                    if (selectedIds.length === organizations.length) {
                      field.onChange([]);
                    } else {
                      field.onChange(organizations.map((org) => org.id));
                    }
                  };

                  const toggleSingle = (id: number) => {
                    if (selectedIds.includes(id)) {
                      field.onChange(selectedIds.filter((item) => item !== id));
                    } else {
                      field.onChange([...selectedIds, id]);
                    }
                  };

                  return (
                    <FormItem>
                      <FormLabel>Select Organizations (Optional)</FormLabel>

                      <div className="border rounded-lg overflow-hidden">
                        {/* Select All */}
                        <div className="flex items-center gap-2 p-2 border-b bg-white/5">
                          <input
                            type="checkbox"
                            checked={
                              organizations.length > 0 &&
                              selectedIds.length === organizations.length
                            }
                            onChange={toggleSelectAll}
                          />
                          <span>Select All</span>
                        </div>

                        {/* Organization Rows */}
                        <div className="max-h-40 overflow-y-auto">
                          {organizations.map((org) => (
                            <div
                              key={org.id}
                              className="flex items-center gap-2 p-2 border-b"
                            >
                              <input
                                type="checkbox"
                                checked={selectedIds.includes(org.id)}
                                onChange={() => toggleSingle(org.id)}
                              />
                              <span>{org.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBroadcast;
