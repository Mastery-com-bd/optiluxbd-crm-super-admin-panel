/* eslint-disable @typescript-eslint/no-explicit-any */
import * as z from "zod";
import { TPlan } from "./plan.types";

export const orgSchema = () => z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    ownerName: z.string().min(2, "Owner name is required"),
    ownerEmail: z.string().email("Invalid owner email"),
    ownerPassword: z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().min(10, "Phone number is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    website: z.string().url("Invalid website URL"),
    slug: z.string().min(2, "Slug is required"),
    couponCode: z.string().optional(),
    proofUrl: z.string().url("Invalid URL"),
    autoApprove: z.boolean(),
    // amount: z.number().min(1, "Amount is required"),
    transactionReference: z.string().min(5, "Transaction reference is required"),
    paymentMethod: z.enum(["MANUAL", "STRIPE", "SSLCOMMERZ", "BKASH", "NAGAD", "BANK_TRANSFER", "CASH"], { message: "Please select a valid payment method" }),
    planId: z.number().or(z.string()),
    planSlug: z.string().min(1, "Plan name is required"),
    billingCycle: z.enum(["MONTHLY", "YEARLY"], {
        message: "Please select a billing cycle",
    }),
});

export type OrgFormValues = z.infer<ReturnType<typeof orgSchema>>;

export interface OrganizationData {
    id: number;
    name: string;
    slug: string;
    email: string;
    phone: string;
    logo_url: string | null;
    logo_public_id: string | null;
    website: string;
    planId: number;
    planExpiresAt: string;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    maxUsers: number;
    maxCustomers: number;
    maxLocations: number;
    maxProducts: number;
    maxOrdersPerMonth: number;
    featureOverrides: Record<string, any>;
    timezone: string;
    currency: string;
    dateFormat: string;
    allowedDomains: string[];
    ipWhitelist: string[];
    isActive: boolean;
    isSuspended: boolean;
    suspendedAt: string | null;
    suspendedReason: string | null;
    createdAt: string;
    updatedAt: string;
    trialEndsAt: string;
    plan: TPlan;
}

export interface Organization {
    id: number;
    name: string;
    slug: string;
    email: string;
    plan: string;
    planExpiresAt: string | null;
    isActive: boolean;
    isSuspended: boolean;
    createdAt: string;
    _count: {
        users: number;
    };
}
export type Organizations = Organization[];

export type TOrgPayload = {
    name: string;
    slug: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    country: string;
    ownerName: string;
    ownerEmail: string;
    ownerPassword: string;
    plan: string;
    billingCycle: "MONTHLY" | "YEARLY";
}


export type TPurchasePayload = {
    organizationId: any;
    planId: string | number;
    billingCycle: "MONTHLY" | "YEARLY";
    amount: number;
    paymentMethod: "MANUAL" | "STRIPE" | "SSLCOMMERZ" | "BKASH" | "NAGAD" | "BANK_TRANSFER" | "CASH";
    transactionReference: string;
    proofUrl: string;
    autoApprove: boolean;
}