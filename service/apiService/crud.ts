/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { getValidToken } from "../authService/validToken";
import { revalidateTag } from "next/cache";
import { config } from "@/config";
import { buildParams } from "@/utils/paramsBuilder";
import { cookies } from "next/headers";

// const getCookie = async () => {

//     return cookieStore;
// }
// const cookieStore = getCookie();

export async function createData<T>(endPoint: string, data: T, tags: string) {
    const token = cookieStore.get("accessToken")!.value;
    try {
        const res = await fetch(`${config.next_public_base_api}${endPoint}`, {
            method: "POST",
            headers: {
                Authorization: token,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        revalidateTag(tags, "default");
        return result;
    } catch (error: any) {
        return Error(error);
    }
}

//get 
const cookieStore = await cookies();

export async function readData(endPoint: string, tags: string[], query?: {
    [key: string]: string | string[] | undefined
}) {

    const token = cookieStore.get("accessToken")!.value;
    try {
        const res = await fetch(
            `${config.next_public_base_api}${endPoint}?${query ? buildParams(query) : ""}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                next: {
                    tags: [...tags],
                },
            } as RequestInit
        );
        const result = await res.json();
        console.log("responce--->", result);
        return result;
    } catch (error: any) {
        return error;
    }
}


// delete
export async function deleteData(endPoint: string, tags: string[]) {
    const token = cookieStore.get("accessToken")!.value;
    try {
        const res = await fetch(
            `${config.next_public_base_api}${endPoint}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                next: {
                    tags: [...tags],
                },
            } as RequestInit
        );
        const result = await res.json();
        console.log("responce--->", result);
        return result;
    } catch (error: any) {
        return error;
    }
}