type TPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT";

export type TBroadcast = {
  id: number;
  title: string;
  message: string;
  priority: TPriority;
};
