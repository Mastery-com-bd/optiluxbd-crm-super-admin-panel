import * as z from "zod";

export const orgSchema = (isUpdate?: boolean) => z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email"),
    ownerName: z.string().min(2, "Owner name is required"),
    ownerEmail: z.string().email("Invalid owner email"),
    ownerPassword: isUpdate
        ? z.string().optional()
        : z.string().min(8, "Password must be at least 8 characters"),
    phone: z.string().min(10, "Phone number is required"),
    website: z.string().url("Invalid website URL"),
    slug: z.string().min(2, "Slug is required"),
    plan: z.enum(["STARTER", "PRO", "ENTERPRISE"], {
        message: "Please select a plan",
    }),
});

export type OrgFormValues = z.infer<ReturnType<typeof orgSchema>>;


export interface Organization {
    "id": number,
    "name": string,
    "slug": string,
    "email": string,
    "plan": string,
    "planExpiresAt": string | null,
    "isActive": boolean,
    "isSuspended": boolean,
    "createdAt": string,
    "_count": {
        "users": number
    }
}

export type Organizations =
    Organization[]