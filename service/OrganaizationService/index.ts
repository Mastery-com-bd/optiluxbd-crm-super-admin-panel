'use server'
import { createData, patchData, readData } from "@/service/apiService/crud";
import { OrganizationData, OrgFormValues, TOrgPayload, TPurchasePayload } from "@/types/organizations";
import { Query } from "@/types/shared";

type Plan = {
  planId: number
}

export async function createOrganization(data: TOrgPayload) {
  try {
    const res = await createData<TOrgPayload>("/organizations/register", "/admin/organizations", data);
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

export async function reactivateOrganization(id: number) {
  const res = await createData(`/admin/organizations/${id}/reactivate`, "/dashboard/organizations");
  return res;
}

export async function suspendOrganization(id: number) {
  const res = await createData(`/admin/organizations/${id}/suspend`, "/dashboard/organizations");
  return res;
}

export async function getOrganizationById(id: number) {
  const res = await readData(`/admin/organizations/${id}`, ["Organization"]);
  return res;
}

export async function enableOrganization(id: number) {
  const res = await createData(`/admin/organizations/${id}/enable`, "/dashboard/organizations");
  return res;
}

export async function disableOrganization(id: number) {
  const res = await createData(`/admin/organizations/${id}/disable`, "/dashboard/organizations");
  return res;
}

export async function validateCouponCode(code: string,) {
  const res = await createData(`/subscriptions/coupons/validate`, "Coupon", {
    "couponCode": code
  });
  return res;
}

export async function calculatePrice(data: { planId: number | string; billingCycle: string; couponCode?: string }) {
  const res = await createData(`/subscriptions/calculate-price`, "PriceCalculation", data);
  return res;
}


export async function manualPurchase(data: TPurchasePayload) {
  const res = await createData(`/subscriptions/admin/manual-payment`, "Subscription", data);
  return res;
}