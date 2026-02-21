import { Query } from "@/types/shared";
import { readData } from "../apiService/crud";

export const getUserActions = async ({ userId, query }: { userId: number, query?: Query }) => {
    const res = await readData(`/admin/audit/user/${userId}`, ["UserActions"], query);
    return res;
}