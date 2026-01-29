export type TFeature = {
  description: string | null;
  id: number;
  key: string;
  name: string;
  planId: number;
  value: string;
};

export type TFeatureData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};
