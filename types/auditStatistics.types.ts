export interface TAnalyticsResponse {
  success: boolean;
  data: {
    byAction: Record<string, number>;
    byEntityType: Record<string, number>;
    byActionAndEntity: Array<{
      action: string;
      entityType: string;
      count: number;
    }>;
  };
}