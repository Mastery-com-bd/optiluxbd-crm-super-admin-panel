export interface IUserActionLog {
  id: number;
  organizationId: number | null;
  entityType: string;
  entityId: string;
  action: string;
  userId: number;
  userName: string;
  userEmail: string;
  previousData: any;
  newData: {
    email: string;
    [key: string]: any;
  } | null;
  changedFields: string[];
  ipAddress: string;
  userAgent: string;
  endpoint: string;
  method: string;
  createdAt: string;
}

export interface IUserActionsResponse {
  success: boolean;
  data: {
    logs: IUserActionLog[];
    total: number;
    limit: number;
    offset: number;
  };
}