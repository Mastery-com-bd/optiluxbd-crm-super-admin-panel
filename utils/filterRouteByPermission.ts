import { NavRoute } from "@/constants/CRM_Navigation";

export const canAccessRoute = (
  route: NavRoute,
  userPermissions: string[] = [],
) => {
  if (!route.permissions || route.permissions.length === 0) return true;
  return route.permissions.some((p) => userPermissions.includes(p));
};

export const filterRoutesByPermissions = (
  routes: NavRoute[],
  userPermissions: string[],
): NavRoute[] => {
  return routes
    .map((route) => {
      if (route.children && route.children.length > 0) {
        const visibleChildren = filterRoutesByPermissions(
          route.children,
          userPermissions,
        );
        if (visibleChildren.length === 0) return null;
        return { ...route, children: visibleChildren };
      }
      return canAccessRoute(route, userPermissions) ? route : null;
    })
    .filter(Boolean) as NavRoute[];
};
