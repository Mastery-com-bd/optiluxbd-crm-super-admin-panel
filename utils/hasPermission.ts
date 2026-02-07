export const hasPermission = (
  userPermissions: string[] = [],
  requiredPermissions: string[] = [],
) => {
  return requiredPermissions.some((p) => userPermissions.includes(p));
};
