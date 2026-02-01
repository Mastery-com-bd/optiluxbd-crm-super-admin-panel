'use client'
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TCoupon, TCouponList } from "@/types/coupons";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

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
    const [deleteId, setDeleteId] = useState<number | null>();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean | null>();
    async function handleToggleCouponStatus(id: number) {

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
                                    onCheckedChange={() => handleToggleCouponStatus(coupon.id)}
                                />
                            </TableCell>
                            <TableCell className="px-4 py-3 text-center">{coupon.usedCount}</TableCell>

                            <TableCell className="px-4 py-3 text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="cursor-pointer p-2 rounded-full transition-colors">
                                        <MoreVertical className="h-4 w-4" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-40">
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
                                                setDeleteId(coupon.id);
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
        </div>
    )
}
