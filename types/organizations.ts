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