import CouponDetail from "@/components/dashboard/coupons/CouponDetail";
import PageHeader from "@/components/shared/pageHeader";
import { getSingleCoupon } from "@/service/coupon";

export default async function CouponDetailsPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const coupon = await getSingleCoupon(id);
    return (
        <div>
            <PageHeader title={`Coupon Details - ${coupon?.data?.code}`} description="View and manage coupon details." />
            <CouponDetail coupon={coupon.data} />
        </div>
    )
}
