import { TPermission } from "./permission.types";

type TRolePermission = {
  created_at: string;
  id: number;
  permission: TPermission;
  permissionId: number;
  roleId: number;
};

export type TRoles = {
  id: number;
  description: string;
  name: string;
  organizationId: number | null;
  isSystemRole: boolean;
  permissions: TRolePermission[];
  created_at: string;
  updated_at: string;
};
