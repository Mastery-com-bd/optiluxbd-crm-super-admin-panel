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
} from "@/components/ui/select";
import { createPlan, TPlanForm } from "@/service/plans";
import { TFeatureData } from "@/types/feature.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character."),
  description: z.string().optional(),
  priceDaily: z.string().optional(),
  priceMonthly: z.string().min(1, "Monthly price is required."),
  priceYearly: z.string().optional(),
  priceOneTime: z.string().optional(),
  maxUsers: z.string().optional(),
  maxCustomers: z.string().optional(),
  maxLocations: z.string().optional(),
  maxProducts: z.string().optional(),
  maxInvoices: z.string().optional(),
  maxStorage: z.string().optional(),
  maxApiCalls: z.string().optional(),
  trialDays: z.string().optional(),
  isOneTime: z.boolean().optional(),
  isActive: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  features: z
    .array(
      z.object({
        value: z.string().min(1),
      }),
    )
    .min(1, "At least one feature is required"),
});

type TCreatePlan = z.infer<typeof formSchema>;

const CreatePlan = ({ features = [] }: { features: TFeatureData[] }) => {
  const [open, setOpen] = useState(false);

  const form = useForm<TCreatePlan>({
    resolver: zodResolver(formSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const availableFeatures = features.filter(
    (f) => !fields.some((field) => field.value === f.slug),
  );

  const onSubmit = async (data: TCreatePlan) => {
    const payload: TPlanForm = {
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      description: data.description,
      priceDaily: data.priceDaily ? Number(data.priceDaily) : undefined,
      priceMonthly: Number(data.priceMonthly),
      priceYearly: data.priceYearly ? Number(data.priceYearly) : 0,
      priceOneTime: data.priceOneTime ? Number(data.priceOneTime) : undefined,
      maxUsers: data.maxUsers ? Number(data.maxUsers) : 1,
      maxCustomers: data.maxCustomers ? Number(data.maxCustomers) : 100,
      maxLocations: data.maxLocations ? Number(data.maxLocations) : 1,
      maxProducts: data.maxProducts ? Number(data.maxProducts) : 100,
      maxInvoices: data.maxInvoices ? Number(data.maxInvoices) : 100,
      maxStorage: data.maxStorage ? Number(data.maxStorage) : 1024,
      maxApiCalls: data.maxApiCalls ? Number(data.maxApiCalls) : 10000,
      trialDays: data.trialDays ? Number(data.trialDays) : 0,
      isOneTime: Boolean(data.isOneTime),
      isActive: Boolean(data.isActive),
      isPublic: Boolean(data.isPublic),
      features: data.features.map((f) => f.value),
    };
    const toastId = toast.loading("creating plan...");

    try {
      const result = await createPlan(payload);
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
            <span className="text-sm text-white">Create Plan</span>
          </p>
          <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,rgba(255,177,63,0)_0%,#FFB13F_50%,rgba(255,177,63,0)_100%)]" />
          </div>
          <CornerGlowSvg />
        </button>
      </DialogTrigger>

      <DialogContent className="px-6 py-4 w-[40vw] max-w-150 gap-2 bg-[#1A1129] border-white/10 max-h-screen overflow-y-auto hide-scrollbar">
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

            <div className="space-y-4">
              {/* Name, Description, and Prices */}
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
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Optional description"
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
                  name="priceDaily"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Daily Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Daily price"
                          type="number"
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
                  name="priceMonthly"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Monthly Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Monthly price"
                          type="number"
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
                  name="priceYearly"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        Yearly Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Yearly price"
                          type="number"
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
                  name="priceOneTime"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-xs font-normal text-white">
                        One-Time Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="One-time price"
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

              {/* Limits */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "maxUsers", label: "Max Users" },
                  { name: "maxCustomers", label: "Max Customers" },
                  { name: "maxLocations", label: "Max Locations" },
                  { name: "maxProducts", label: "Max Products" },
                  { name: "maxInvoices", label: "Max Invoices" },
                  { name: "maxStorage", label: "Max Storage (MB)" },
                  { name: "maxApiCalls", label: "Max API Calls" },
                  { name: "trialDays", label: "Trial Days" },
                ].map((fieldItem) => (
                  <FormField
                    key={fieldItem.name}
                    control={form.control}
                    name={fieldItem.name as keyof TCreatePlan} // ✅ Correct
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel className="text-xs font-normal text-white">
                          {fieldItem.label}
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder={fieldItem.label}
                            className="bg-white/10 border-none rounded-lg text-white"
                            {...field}
                            value={(field.value as string) || ""}
                          />
                        </FormControl>
                        <FormMessage className="text-[10px]" />
                      </FormItem>
                    )}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between gap-6">
                {/* featured */}
                <div className="flex gap-4 w-full">
                  {/* Dropdown */}
                  <div className="space-y-2 ">
                    <FormField
                      control={form.control}
                      name="features"
                      render={() => (
                        <FormItem>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormLabel>Features</FormLabel>

                    <Select
                      onValueChange={(value) => {
                        if (!value) return;
                        append({ value });
                      }}
                    >
                      <SelectTrigger className="bg-white/10 border-none rounded-lg text-white">
                        Select Feature
                      </SelectTrigger>

                      <SelectContent>
                        {availableFeatures.map((feature) => (
                          <SelectItem key={feature?.id} value={feature?.slug}>
                            {feature?.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    {fields.map((field, index) => (
                      <div key={field?.id} className="flex items-center gap-2">
                        <Input value={field?.value} disabled />

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Boolean Flags */}
                <div className="flex items-center w-full">
                  {[
                    { name: "isOneTime", label: "One Time" },
                    { name: "isActive", label: "Active" },
                    { name: "isPublic", label: "Public" },
                  ].map((fieldItem) => (
                    <div key={fieldItem.name} className="w-full">
                      <FormField
                        control={form.control}
                        name={fieldItem.name as keyof TCreatePlan}
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

export default CreatePlan;
