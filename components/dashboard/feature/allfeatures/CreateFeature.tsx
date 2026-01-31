"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import CornerGlowSvg from "@/components/svgIcon/button/CornerGlowSvg";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createFeature, updateFeature } from "@/service/feature";
import { toast } from "sonner";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFeatureData } from "@/types/feature.types";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  slug: z.string().min(1, "slug is required."),
  description: z.string().min(1, "description is required."),
  status: z.enum(["ACTIVE", "INACTIVE"], "status is required"),
});

export type TCreateFeature = z.infer<typeof formSchema>;

const CreateFeature = ({ feature }: { feature?: TFeatureData }) => {
  const [open, setOpen] = useState(false);
  const form = useForm<TCreateFeature>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: feature?.name || "",
      slug: feature?.slug || "",
      description: feature?.description || "",
      status: feature?.status || undefined,
    },
  });
  const nameValue = form.watch("name");

  useEffect(() => {
    if (feature) return;
    if (!nameValue) return;

    const slug = nameValue
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

    form.setValue("slug", slug, { shouldValidate: true });
  }, [nameValue, feature, form]);

  const onSubmit = async (data: TCreateFeature) => {
    const toastId = toast.loading("creating feature...", { duration: 3000 });
    try {
      let result;
      if (feature) {
        result = await updateFeature(data, feature?.id);
      } else {
        result = await createFeature(data);
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
        {feature ? (
          <button className="cursor-pointer bg-transparent p-2 ">Update</button>
        ) : (
          <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Create Feature</span>
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
                {feature ? "Update Feature" : "Create Feature"}
              </DialogTitle>

              <ButtonComponent
                icon={Plus}
                type="submit"
                varient="yellow"
                buttonName={feature ? "Update" : "Save"}
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
                        placeholder="Enter feature name"
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
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="auto-generated slug"
                        className="effect border-none rounded-lg text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel>Select Priority</FormLabel>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {["ACTIVE", "INACTIVE"].map((item, i) => {
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

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <textarea
                        placeholder="Write description..."
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

export default CreateFeature;
