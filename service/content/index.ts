"use server"

import { TContent } from "@/types/content";
import { createData, deleteData, patchData, readData } from "../apiService/crud";
import { Query } from "@/types/shared";


export async function createContent(data: TContent) {
    const res = await createData("/admin/content", "/dashboard/content", data)
    return res;
}

export async function getAllContent(query?: Query) {
    const res = await readData("/admin/content", ["Content"], query);
    return res;
}

export async function updateContent(id: number, data: { title: string, content: string }) {
    const res = await patchData(`/admin/content/${id}`, "/dashboard/content", data);
    return res;
}


export async function deleteContent(id: number) {
    const res = await deleteData(`/admin/content/${id}`, "/dashboard/content");
    return res;
}

export async function getContentById(key: string) {
    const res = await readData(`/admin/content/${key}`, ["Content"]);
    return res;
}