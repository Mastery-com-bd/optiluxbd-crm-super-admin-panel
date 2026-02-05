
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { TCoupon } from "@/types/coupons";
export default function UpdateCoupon({
    coupon,
    open,
    setOpen,
}: {
    coupon: TCoupon | null;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    return (
        <div>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="max-w-100!">
                    <DialogHeader>
                        <DialogTitle className="text-center">
                            Update {coupon?.code}&apos;s plan
                        </DialogTitle>
                    </DialogHeader>

                    <div className="py-6 space-y-4">
                        
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
