import AddCouponModal from "@/components/dashboard/coupons/AddCouponModal";
import AllCoupons from "@/components/dashboard/coupons/AllCoupons";
import PageHeader from "@/components/shared/pageHeader";
import { getAllCoupons } from "@/service/coupon"

export default async function Coupons() {
    const coupons = await getAllCoupons();
    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Coupon Management" description="Manage you coupon as you want." />
                <AddCouponModal />
            </div>
            <AllCoupons coupons={coupons.data} />
        </div>
    )
}