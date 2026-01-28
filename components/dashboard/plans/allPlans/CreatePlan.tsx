/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { createPlan, updatePlan } from "@/service/plans";
import { TPlan } from "@/types/plan.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, SquarePen, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  price: z.string().min(1, "Price is required."),
  features: z
    .array(
      z.object({
        value: z.string().min(1, "Feature cannot be empty"),
      }),
    )
    .min(1, "At least one feature is required"),
});

export type TCreatePlan = {
  name: string;
  price: string;
  features: { value: string }[];
};

const CreatePlan = ({ plan }: { plan?: TPlan }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TCreatePlan>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: plan?.name || "",
      price: plan?.priceMonthly || "",
      features: plan?.features.length
        ? plan?.features.map((f) => ({ value: f?.name }))
        : [{ value: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const onSubmit = async (data: TCreatePlan) => {
    const payload = {
      ...data,
      price: Number(data.price),
      features: data.features.map((f: any) => f.value),
    };
    const toastId = toast.loading("creating plan...", { duration: 3000 });
    try {
      let result;
      if (plan) {
        result = await updatePlan(payload, plan?.id);
      } else {
        result = await createPlan(payload);
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
        {plan ? (
          <button className=" w-7 h-7 p-1.5 rounded-[12px] effect cursor-pointer">
            <SquarePen size={16} className="text-[#58E081]" />
          </button>
        ) : (
          <button className="relative cursor-pointer effect rounded-2xl py-2 flex items-center justify-center px-4 overflow-hidden">
            <p className="flex items-center gap-2">
              <Plus size={18} />
              <span className="text-sm text-white">Create Plan</span>
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
                {plan ? "Update Plan" : "Create A New Plan"}
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
              {/* Name and Price */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Plan Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter plan name"
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
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Price in Taka"
                          type="number"
                          className="bg-white/10 border-none rounded-lg text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-[10px]" />
                    </FormItem>
                  )}
                />
              </div>

              {/* Dynamic Features */}
              <div className="space-y-2">
                <FormLabel className="text-xs font-normal text-white">
                  Features
                </FormLabel>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-2">
                    <FormField
                      control={form.control}
                      name={`features.${index}.value`}
                      render={({ field }) => (
                        <FormItem className="w-full">
                          <FormControl>
                            <Input
                              placeholder={`${
                                plan?.features?.[index]?.name ||
                                `enter features`
                              }`}
                              className="bg-white/10 border-none rounded-lg text-white"
                              {...field}
                              value={field.value || ""}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />

                    <button
                      type="button"
                      className="text-red-500 text-sm"
                      onClick={() => remove(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="text-green-400 mt-1"
                  onClick={() => append({ value: "" })}
                >
                  + Add Feature
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePlan;
