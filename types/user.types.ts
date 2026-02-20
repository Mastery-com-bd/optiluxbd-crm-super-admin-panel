import { TRoles } from "./roles.types";

export type TUser = {
  userId: string;
  role: string;
  isLandlord: boolean;
  iat: string;
  exp: number;
};

export type TUserRole = {
  userId: number;
  roleId: number;
  role: TRoles;
};

export type TStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "SUSPENDED"
  | "DISABLED"
  | "REJECTED";

export type TUserData = {
  id: number;
  name: string;
  email: string;
  phone: string;
  email_verified: boolean;
  phone_verified: boolean;
  is_active: boolean;
  is_approved: boolean;
  status: TStatus;
  roles: TUserRole[];
  organizationId: number | null;
  userId: number | null;
  avatar_secure_url: string | null;
  avatar_public_id: string | null;
  approved_at: string | null;
  approved_by: number | null;
  last_login: string | null;
  reset_token: string | null;
  reset_token_expires: string | null;
  verification_token: string | null;
  verification_expires: string | null;
  created_at: string;
};
