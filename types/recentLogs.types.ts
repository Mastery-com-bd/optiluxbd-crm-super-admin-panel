export interface AuditLogUser {
  id: number;
  email: string;
  name: string;
}

export interface AuditLog {
  id: number;
  action: string;
  entityType: string;
  entityId: string;
  endpoint: string;
  method: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
  organizationId: number | null;
  userId: number;
  userEmail: string;
  userName: string;
  previousData: any;
  newData: any;
  changedFields: string[];
  user: AuditLogUser;
}

export enum AuditAction {
  Create = "CREATE",
  Update = "UPDATE",
  Delete = "DELETE",
  Login = "LOGIN",
  Logout = "LOGOUT",
  Export = "EXPORT",
  Import = "IMPORT",
}

export interface TAuditLogsResponse {
  success: boolean;
  data: {
    logs: AuditLog[];
    total: number;
    limit: number;
    offset: number;
  };
}
