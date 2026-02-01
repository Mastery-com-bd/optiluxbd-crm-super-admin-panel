export type TDiscountType = "FIXED_AMOUNT" | "PERCENTAGE";
export interface TCoupon {
    id: number;
    code: string;
    discountType: TDiscountType;
    discountValue: string;
    minPurchase: string;
    maxDiscount: string | null;
    expiresAt: string | null;
    maxUses: number | null;
    usedCount: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}
export type TCouponList = TCoupon[];