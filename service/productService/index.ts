'use server'
import { readData } from "@/service/apiService/crud";

export async function fetchProducts() {

  try {
    console.log("hi.....");
    const data = await readData('/product', ["Product"]);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: "Failed to fetch" };
  }
}