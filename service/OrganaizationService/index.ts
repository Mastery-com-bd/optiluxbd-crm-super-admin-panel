'use server'
import { readData } from "@/service/apiService/crud";

export async function fetchOrganizations() {
  try {
    const data = await readData('/admin/organizations', ["Organization"]);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch" };
  }
}