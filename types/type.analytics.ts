export type TRevenewSection = {
  month: string;
  amount: number;
};

export type TUsageAnalytics = {
  organizationId: number;
  organizationName: string;
  slug: string;
  usage: number;
  limit: number;
  percentage: number;
};
