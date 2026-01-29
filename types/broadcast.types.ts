type TPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type TBroadcast = {
  id: number;
  title: string;
  message: string;
  priority: TPriority;
  createdAt: string;
  createdBy: number;
  expiresAt: string | null;
  isActive: boolean;
  isRead: boolean;
  readAt: string | null;
  type: string;
  updatedAt: string;
};
