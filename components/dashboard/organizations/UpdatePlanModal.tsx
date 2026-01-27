/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Organization } from "@/types/organizations";
import { getAllPlan } from "@/service/planService";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateOrganizationPlan } from "@/service/OrganaizationService";
import { toast } from "sonner";

export default function UpdatePlanModal({
    organization,
    open,
    setOpen
}: {
    organization: Organization | null;
    open: boolean;
    setOpen: (open: boolean) => void
}) {
    const [plans, setPlans] = useState<any[]>([]);
    const [selectedPlan, setSelectedPlan] = useState<string>("");

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllPlan();
            setPlans(result.data || []);
        };
        if (open) fetchData();
    }, [open]);

    const handleSubmit = async () => {
        // Basic validation
        if (!organization?.id) {
            return toast.error("Organization ID is missing!");
        }
        if (!selectedPlan) {
            return toast.error("Please select a plan first.");
        }

        const toastId = toast.loading("Updating organization plan...");
        try {
            const res = await updateOrganizationPlan(organization.id, {
                planId: Number(selectedPlan)
            });
            if (res && !res.error) {
                toast.success("Plan updated successfully!", { id: toastId });
                setOpen(false);
            } else {
                toast.error(res?.message || "Failed to update plan", { id: toastId });
            }
        } catch (error: any) {
            console.error("Update Error:", error);
            toast.error(error?.message || "Something went wrong. Please try again.", { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-100!">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Update {organization?.name}&apos;s plan
                    </DialogTitle>
                </DialogHeader>

                <div className="py-6 space-y-4">
                    <Select onValueChange={(value) => setSelectedPlan(value)}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a plan" />
                        </SelectTrigger>
                        <SelectContent>
                            {plans.map((plan) => (
                                <SelectItem key={plan.id} value={plan.id.toString()}>
                                    {plan.name} - ${plan.priceMonthly}/mo
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        className="w-full"
                        onClick={handleSubmit}
                        disabled={!selectedPlan}
                    >
                        Update Plan
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}