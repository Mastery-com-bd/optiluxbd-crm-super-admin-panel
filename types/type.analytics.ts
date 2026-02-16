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

export type TAnalytics = {
  activeSubscriptions: number;
  churnRate: number;
  mrr: number;
  totalOrganizations: number;
};

export type TGrowthReport = {
  count: number;
  date: string;
};
