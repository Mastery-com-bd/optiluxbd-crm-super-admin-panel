export type TPermission = {
  id: number;
  key: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type TUserRolePermission = {
  id: number;
  roleId: number;
  permission: TPermission[];
  permissionId: number;
  created_at: string;
};
