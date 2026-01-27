'use server'
import { createData, readData } from "@/service/apiService/crud";
import { OrgFormValues } from "@/types/organizations";
import { unstable_cache } from "next/cache";

export async function createOrganization(data: OrgFormValues) {
  try {
    return await createData("/organizations/register", data, "Organization");
  }
  catch (e) { return e }
}
export async function fetchOrganizations() {
  return unstable_cache(
    async () => {
      const data = await readData('/admin/organizations', ["Organization"]);
      return data;
    },
    ['organizations-list'],
    { tags: ['Organization'], revalidate: 300 }
  )();
}

export async function deleteOrganization(id: number) {
  console.log(id);
}