'use client'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { disableCoupon, enableCoupon } from "@/service/coupon";
import { TCoupon, TCouponList } from "@/types/coupons";
import { Eye, MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Dropdown } from "react-day-picker";
import { toast } from "sonner";
import { set } from "zod";

const keys = [
    "CODE",
    "DISCOUNT VALUE",
    "MIN PURCHASE",
    "MAX USAGES",
    "EXPIRE DATE",
    "CREATED AT",
    "UPDATED AT",
    "IS ACTIVE",
    "USED COUNT",
    "ACTIONS",
];
export default function AllCoupons({ coupons }: { coupons: TCouponList }) {
    const [selectedCoupon, setSelectedCoupon] = useState<TCoupon | null>(null);
    const [updateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
    async function handleToggleCouponStatus(id: number, isActive: boolean) {
        let r;
        const toastId = toast.loading("Updating Coupon Status...");
        if (isActive) {
            r = await disableCoupon(id);
        } else {
            r = await enableCoupon(id);
        }
        if (r instanceof Error) {
            toast.error("Failed to update coupon status", { id: toastId });
        } else {
            toast.success("Coupon status updated successfully", { id: toastId });
        }
    }

    async function handleDelete(id: number) {
        const toastId = toast.loading("Deleting Coupon....");
        try {
            
        } catch (error) {
            console.error("Error deleting coupon:", error);
        }
    }
    return (
        <div>
            <Table className="w-full my-6">
                <TableHeader>
                    <TableRow>
                        {keys.map((label, ind) => (
                            <TableHead
                                first={ind === 0}
                                last={ind === keys.length - 1}
                                key={label}
                                className="text-left text-xs font-semibold uppercase text-muted-foreground"
                            >
                                {label}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {coupons?.map((coupon: TCoupon) => (
                        <TableRow
                            key={coupon.id}
                            className="border-muted hover:bg-muted/50 transition-colors"
                        >
                            <TableCell className="px-4 py-3 font-medium text-center">{coupon.code}</TableCell>
                            <TableCell className="px-4 py-3 text-center">{coupon.discountValue}</TableCell>
                            <TableCell className="px-4 py-3 text-center">{coupon.minPurchase}</TableCell>
                            <TableCell className="px-4 py-3 text-center">{coupon.maxUses ?? "N/A"}</TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                {coupon.expiresAt ? new Date(coupon.expiresAt).toLocaleDateString() : "N/A"}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                {new Date(coupon.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                {new Date(coupon.updatedAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">
                                <Switch
                                    checked={coupon.isActive}
                                    onCheckedChange={() => handleToggleCouponStatus(coupon.id, coupon.isActive)}
                                />
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">{coupon.usedCount}</TableCell>

                            <TableCell className="px-4 py-3 text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full transition-colors">
                                        <MoreVertical className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
                                        <DropdownMenuItem>
                                            <Link href={`/dashboard/coupons/${coupon.id}`} className="flex gap-2">
                                                <Eye className="w-4 h-4 mr-2" /> <span>View Details</span>
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            className="cursor-pointer"
                                            onSelect={() => {
                                                setSelectedCoupon(coupon);
                                                setIsUpdateModalOpen(true);
                                            }}
                                        >
                                            <Pencil className="w-4 h-4 mr-2" /> Update
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem
                                            className="cursor-pointer text-destructive focus:text-destructive"
                                            onClick={() => {
                                                setSelectedCoupon(coupon);
                                                setIsDeleteDialogOpen(true);
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your
                            organization and remove your data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                if (selectedCoupon) {
                                    handleDelete(selectedCoupon.id);
                                    setIsDeleteDialogOpen(false);
                                }
                            }}
                        >
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
