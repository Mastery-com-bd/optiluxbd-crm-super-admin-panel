export type TPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";
export type TType = "INFO" | "WARNING" | "MAINTENANCE" | "URGENT";

export type TBroadcast = {
  id: number;
  title: string;
  message: string;
  createdAt: string;
  createdBy: number;
  expiresAt: string | null;
  isActive: boolean;
  isRead: boolean;
  readAt: string | null;
  type: TType;
  updatedAt: string;
};
