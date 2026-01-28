'use server'
import { createData, patchData, readData } from "@/service/apiService/crud";
import { OrgFormValues } from "@/types/organizations";
import { Query } from "@/types/shared";

type Plan = {
  planId: number
}

export async function createOrganization(data: OrgFormValues) {
  try {
    const res = await createData<OrgFormValues>("/organizations/register", "/admin/organizations", data,);
    return res;
  }
  catch (e) { return e }
}

export async function fetchOrganizations(query?: Query) {
  const data = await readData('/admin/organizations', ["Organization"], query);
  return data;
}

export async function deleteOrganization(id: number) {
  console.log(id);
}

export async function updateOrganizationPlan(id: number, data: Plan) {
  const res = await patchData<Plan>(`/admin/organizations/${id}/plan`, "/dashboard/organizations", data);
  return res;
}

export async function updateOrganizationStatus(id: number) {
  const res = await createData(`/admin/organizations/${id}/reactivate`, "/dashboard/organizations");
  return res;
}
export async function updateOrganizationSuspendStatus(id: number) {
  const res = await createData(`/admin/organizations/${id}/suspend`, "/dashboard/organizations");
  return res;
}

export async function getOrganizationById(id: number) {
  const res = await readData(`/admin/organizations/${id}`, ["Organization"]);
  return res;
}