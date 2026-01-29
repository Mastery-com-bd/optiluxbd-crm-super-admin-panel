'use server'

import { createData, patchData, readData } from "@/service/apiService/crud";
import { Query } from "@/types/shared";

export async function getAllSupportToken(Query?: Query) {
    const res = await readData("/support", ["Support"], Query);
    return res;
}
type Status = {
    status: string,
}
export async function updateTicketStatus(id: number, data: Status) {
    const res = await patchData(`/support/${id}`, "/dashboard/support", data);
    return res;
}

export async function replyTicketMessage(id: number, data: { message: string }) {
    const res = await createData(`/support/${id}/reply`, "/dashboard/support", data);
    return res;
}