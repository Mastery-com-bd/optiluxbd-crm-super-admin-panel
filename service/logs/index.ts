import { Query } from "@/types/shared";
import { readData } from "../apiService/crud";

export const getRecentLogs = async (query?: Query) => {
    const res = await readData("/admin/audit/recent", ["RecentLogs"], query);
    return res;
}

export const getAuditStatistics = async (query?: Query) => {
    const res = await readData("/admin/audit/statistics", ["AuditStatistics"], query);
    return res;
}