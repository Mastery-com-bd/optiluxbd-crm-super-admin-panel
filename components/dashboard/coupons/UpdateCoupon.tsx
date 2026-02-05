"use client";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TCoupon } from "@/types/coupons";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect } from "react";
import { toast } from "sonner";
import { updateCoupon } from "@/service/coupon";

const updateCouponSchema = z.object({
    discountValue: z.number().min(1, "Discount value must be at least 1"),
    maxUses: z.number().min(1, "Max uses must be at least 1"),
});

type UpdateCouponValues = z.infer<typeof updateCouponSchema>;

export default function UpdateCoupon({
    coupon,
    open,
    setOpen,
}: {
    coupon: TCoupon | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    const form = useForm<UpdateCouponValues>({
        resolver: zodResolver(updateCouponSchema),
        defaultValues: {
            discountValue: undefined,
            maxUses: undefined,
        },
    });

    // Reset form when coupon changes
    useEffect(() => {
        if (coupon) {
            form.reset({
                discountValue: Number(coupon.discountValue),
                maxUses: coupon.maxUses || undefined,
            });
        }
    }, [coupon, form]);

    async function onSubmit(values: UpdateCouponValues) {
        if (!coupon?.id) return;

        const toastId = toast.loading("Updating coupon...");
        try {
            const res = await updateCoupon(coupon.id, values);
            if (res.success) {
                toast.success(res.message || "Coupon updated successfully", { id: toastId });
                setOpen(false);
            } else {
                toast.error(res.message || "Failed to update coupon", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Error updating coupon:", error);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-100!">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Update {coupon?.code}&apos;s Details
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Discount Value */}
                                <FormField
                                    control={form.control}
                                    name="discountValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Discount Value</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter discount value"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === ""
                                                                ? undefined
                                                                : Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Max Uses */}
                                <FormField
                                    control={form.control}
                                    name="maxUses"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Max Uses</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Enter max uses"
                                                    value={field.value ?? ""}
                                                    onChange={(e) =>
                                                        field.onChange(
                                                            e.target.value === ""
                                                                ? undefined
                                                                : Number(e.target.value)
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Buttons */}
                                <div className="flex justify-end gap-3 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit">Update Coupon</Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}