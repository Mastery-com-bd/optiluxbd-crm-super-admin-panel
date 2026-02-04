/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  OrganizationData,
  OrgFormValues,
  orgSchema,
} from "@/types/organizations";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createOrganization } from "@/service/payment/OrganaizationService";
import { toast } from "sonner";

interface OrgFormProps {
  initialData?: OrganizationData;
}

export default function OrganizationForm({ initialData }: OrgFormProps) {
  const isUpdate = !!initialData;
  const onFormSubmit = async (data: OrgFormValues) => {
    const toastId = toast.loading(
      isUpdate ? "Updating..." : "Creating organization...",
    );
    try {
      const res = await createOrganization(data);

      if (res && !res.error) {
        toast.success(
          isUpdate
            ? "Organization updated!"
            : "Organization created successfully!",
          { id: toastId },
        );

        if (!isUpdate) {
          form.reset();
        }
      } else {
        toast.error(res.message || "Something went wrong", { id: toastId });
      }
    } catch (error: any) {
      console.error("Submission Error:", error);
      toast.error(error.message || "Failed to submit request", { id: toastId });
    }
  };
  const form = useForm<OrgFormValues>({
    resolver: zodResolver(orgSchema()),
    defaultValues: {
      name: "",
      email: "",
      ownerName: "",
      ownerEmail: "",
      ownerPassword: "",
      phone: "",
      website: "",
      slug: "",
      plan: "STARTER",
    },
  });

  return (
    <div className="effect p-6 rounded-2xl my-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Organization Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input placeholder="acme-corp" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Organization Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="org@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Website */}
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://acme.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Plan Selection */}
            <FormField
              control={form.control}
              name="plan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subscription Plan</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a plan" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="STARTER">Starter</SelectItem>
                      <SelectItem value="PRO">Pro</SelectItem>
                      <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="col-span-1 md:col-span-2 border-t pt-4 mt-2">
              <h3 className="text-sm font-medium mb-4">Owner Information</h3>
            </div>

            {/* Owner Name */}
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner Email */}
            <FormField
              control={form.control}
              name="ownerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="owner@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Owner Password - Hide on Update if needed */}
            {!isUpdate && (
              <FormField
                control={form.control}
                name="ownerPassword"
                render={({ field }) => (
                  <FormItem className="col-span-1 md:col-span-2">
                    <FormLabel>Owner Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting
              ? "Processing..."
              : isUpdate
                ? "Update Organization"
                : "Create Organization"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
