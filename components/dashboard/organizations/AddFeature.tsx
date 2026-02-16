"use client";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { OrganizationData } from "@/types/organizations";

interface AddFeatureProps {
    organizationData: OrganizationData;
}

export default function AddFeature({ organizationData }: AddFeatureProps) {
    const [open, setOpen] = useState(false);

    const getAllFeatures = () => {
        const planFeatures = organizationData.plan.features || [];
        const featureOverrides = organizationData.featureOverrides || {};
        const uniqueFeatures = new Set<string>();
        planFeatures.forEach((feature) => {
            uniqueFeatures.add(feature.key);
        });
        Object.keys(featureOverrides).forEach((key) => {
            uniqueFeatures.add(key);
        });

        const allFeatures = Array.from(uniqueFeatures).map((key) => {
            const planFeature = planFeatures.find((f) => f.key === key);
            const overrideValue = featureOverrides[key];
            return {
                key,
                name: planFeature?.name || key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
                isEnabled: overrideValue !== undefined ? overrideValue : (planFeature?.value === "true" || planFeature?.value === "full"),
                source: planFeature ? "plan" : "override",
            };
        });

        return allFeatures;
    };

    const [features, setFeatures] = useState(getAllFeatures());

    const handleToggle = (key: string) => {
        setFeatures((prev) =>
            prev.map((feature) =>
                feature.key === key
                    ? { ...feature, isEnabled: !feature.isEnabled }
                    : feature
            )
        );
    };

    const handleSave = () => {
        // Prepare data to send to API
        const updatedOverrides: Record<string, boolean> = {};

        features.forEach((feature) => {
            updatedOverrides[feature.key] = feature.isEnabled;
        });

        console.log("Updated Feature Overrides:", updatedOverrides);

        // API call korben ekhane
        // await updateOrganizationFeatures(organizationData.id, updatedOverrides);

        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <ButtonComponent
                    buttonName="Manage Features"
                    varient="yellow"
                    icon={Plus}
                />
            </DialogTrigger>
            <DialogContent className="max-w-100!">
                <DialogHeader>
                    <DialogTitle>Manage Organization Features</DialogTitle>
                    <DialogDescription>
                        Enable or disable features for {organizationData.name}
                    </DialogDescription>
                </DialogHeader>

                <div className="max-h-[400px] overflow-y-auto space-y-3 py-4">
                    {features.length > 0 ? (
                        features.map((feature) => (
                            <div
                                key={feature.key}
                                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <p className="font-semibold text-sm">{feature.name}</p>
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                            {feature.source === "plan" ? "Plan Feature" : "Custom"}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Key: {feature.key}
                                    </p>
                                </div>
                                <Switch
                                    checked={feature.isEnabled}
                                    onCheckedChange={() => handleToggle(feature.key)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-muted-foreground">
                            No features available
                        </div>
                    )}
                </div>

                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSave}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}