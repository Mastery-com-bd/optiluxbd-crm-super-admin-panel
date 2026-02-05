// CouponDetail.tsx
import { TCoupon } from "@/types/coupons";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, Hash, Percent, ShoppingCart, TrendingUp, Users } from "lucide-react";

export default function CouponDetail({ coupon }: { coupon: TCoupon }) {
    const formatDate = (dateString: string | null) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isExpired = coupon?.expiresAt ? new Date(coupon?.expiresAt) < new Date() : false;
    const usagePercentage = coupon?.maxUses ? (coupon?.usedCount / coupon?.maxUses) * 100 : 0;

    return (
        <div className="space-y-6 p-6 rounded-xl mt-6 effect ">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">{coupon?.code}</h1>
                    <p className="text-muted-foreground">Coupon Details</p>
                </div>
                <div className="flex gap-2">
                    <Badge variant={coupon?.isActive ? "default" : "secondary"}>
                        {coupon?.isActive ? "Active" : "Inactive"}
                    </Badge>
                    {isExpired && <Badge variant="destructive">Expired</Badge>}
                </div>
            </div>

            {/* Main Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Discount Type */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Discount Type</CardTitle>
                        {coupon?.discountType === "PERCENTAGE" ? (
                            <Percent className="h-4 w-4 text-muted-foreground" />
                        ) : (
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        )}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {coupon?.discountType === "PERCENTAGE" ? "Percentage" : "Fixed Amount"}
                        </div>
                    </CardContent>
                </Card>

                {/* Discount Value */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Discount Value</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {coupon?.discountType === "PERCENTAGE" 
                                ? `${coupon?.discountValue}%` 
                                : `$${coupon?.discountValue}`}
                        </div>
                    </CardContent>
                </Card>

                {/* Min Purchase */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Min Purchase</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {coupon?.minPurchase === "0" ? "No Minimum" : `$${coupon?.minPurchase}`}
                        </div>
                    </CardContent>
                </Card>

                {/* Max Discount */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Max Discount</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {coupon?.maxDiscount ? `$${coupon?.maxDiscount}` : "Unlimited"}
                        </div>
                    </CardContent>
                </Card>

                {/* Usage Stats */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Usage</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            {coupon?.usedCount} / {coupon?.maxUses ?? "∞"}
                        </div>
                        {coupon?.maxUses && (
                            <p className="text-xs text-muted-foreground">
                                {usagePercentage.toFixed(0)}% used
                            </p>
                        )}
                    </CardContent>
                </Card>

                {/* Expires At */}
                <Card className=" effect">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Expires At</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm font-bold">
                            {formatDate(coupon?.expiresAt)}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Additional Details */}
            <Card className=" effect">
                <CardHeader>
                    <CardTitle>Additional Information</CardTitle>
                    <CardDescription>Timestamps and metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Coupon ID</p>
                            <p className="text-lg font-semibold flex items-center gap-2">
                                <Hash className="h-4 w-4" />
                                {coupon?.id}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <p className="text-lg font-semibold">
                                {coupon?.isActive ? "Active" : "Inactive"}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Created At</p>
                            <p className="text-sm">{formatDate(coupon?.createdAt)}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Updated At</p>
                            <p className="text-sm">{formatDate(coupon?.updatedAt)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Usage Progress (if maxUses exists) */}
            {coupon?.maxUses && (
                <Card className=" effect">
                    <CardHeader>
                        <CardTitle>Usage Progress</CardTitle>
                        <CardDescription>
                            {coupon?.usedCount} out of {coupon?.maxUses} uses
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                            <div
                                className="bg-blue-600 h-4 rounded-full transition-all"
                                style={{ width: `${usagePercentage}%` }}
                            />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            {coupon?.maxUses - coupon?.usedCount} uses remaining
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}