import { TUpdatePlanFeature } from "@/service/plans";
import { TFeatureData } from "@/types/feature.types";

export const buildFeatureActions = (
  oldFeatures: string[],
  newFeatures: string[],
  allFeatures: TFeatureData[],
): TUpdatePlanFeature[] => {
  const actions: TUpdatePlanFeature[] = [];

  const oldSet = new Set(oldFeatures);
  const newSet = new Set(newFeatures);

  // 1️⃣ Add removed features
  oldFeatures.forEach((key) => {
    if (!newSet.has(key)) {
      actions.push({
        action: "remove",
        key,
      });
    }
  });

  // 2️⃣ Add newly added features
  newFeatures.forEach((key) => {
    if (!oldSet.has(key)) {
      const feature = allFeatures.find((f) => f.slug === key);
      actions.push({
        action: "add",
        key,
        name: feature?.name,
        value: "true",
      });
    }
  });

  return actions;
};
