'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import ButtonComponent from "@/components/ui/ButtonComponent"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Plus } from "lucide-react"
import { createCoupon } from "@/service/coupon"
import { toast } from "sonner"


export const CouponFormSchema = z.object({
    code: z.string().min(2, "Code must be at least 2 characters"),
    discountType: z.enum(["PERCENTAGE", "FIXED_AMOUNT"], {
        message: "Please select a discount type",
    }),
    discountValue: z.number().min(1, "Value must be at least 1"),
    maxUses: z.number().min(1, "Max uses must be at least 1"),
})

export default function AddCouponModal() {
    const [open, setOpen] = useState(false)

    const form = useForm<z.infer<typeof CouponFormSchema>>({
        resolver: zodResolver(CouponFormSchema),
        defaultValues: {
            code: "",
            discountType: undefined, // Add this
            discountValue: undefined, // Add this
            maxUses: undefined, // Add this
        },
    })

    async function onSubmit(values: z.infer<typeof CouponFormSchema>) {
        const toastId = toast.loading("Creating Coupon...");
        try {
            const res = await createCoupon(values);
            if (res.success) {
                toast.success(res.message, { id: toastId });
                form.reset();
                setOpen(false);
            } else {
                toast.error(res.message || "Failed to create coupon", { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
            console.error("Error creating coupon:", error);
        }
    }

    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <ButtonComponent buttonName="Add Coupon" icon={Plus} varient="yellow" />
                </DialogTrigger>

                <DialogContent className="max-w-106.25!">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <DialogHeader>
                                <DialogTitle>Add Coupon</DialogTitle>
                                <DialogDescription>
                                    Make your coupon here. Click save when you&apos;re done.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-4 py-2">
                                {/* Coupon Code */}
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input placeholder="Coupon Code (e.g. WELCOME20)" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Discount Type */}
                                <FormField
                                    control={form.control}
                                    name="discountType"
                                    render={({ field }) => (
                                        <FormItem>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value} // Change from defaultValue to value
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select Discount Type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="PERCENTAGE">Percentage</SelectItem>
                                                    <SelectItem value="FIXED_AMOUNT">Fixed Amount</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* Discount Value */}
                                <FormField
                                    control={form.control}
                                    name="discountValue"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Discount Value"
                                                    value={field.value ?? ""} // Add this to handle undefined
                                                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
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
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    placeholder="Max Uses"
                                                    value={field.value ?? ""} // Add this to handle undefined
                                                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : Number(e.target.value))}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type="button" variant="outline">Cancel</Button>
                                </DialogClose>
                                <ButtonComponent type="submit" buttonName="Save changes" varient="yellow" />
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </div>
    )
}