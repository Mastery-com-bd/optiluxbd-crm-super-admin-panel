export const permissionBasedRoutes: {
  pattern: RegExp;
  permissions: string[];
}[] = [
  {
    pattern: /^\/dashboard$/,
    permissions: ["reports.view"],
  },
  {
    pattern: /^\/dashboard\/user/,
    permissions: ["users.manage", "users.manage"],
  },
  {
    pattern: /^\/dashboard\/organizations/,
    permissions: ["organizations.view", "organizations.manage"],
  },
  {
    pattern: /^\/dashboard\/subscription/,
    permissions: ["subscriptions.manage", "subscriptions.view"],
  },
  {
    pattern: /^\/dashboard\/plans/,
    permissions: ["plans.manage", "plans.view"],
  },
  {
    pattern: /^\/dashboard\/features/,
    permissions: ["plans.manage", "plans.view"],
  },
  {
    pattern: /^\/dashboard\/roles/,
    permissions: ["roles.manage"],
  },
  {
    pattern: /^\/dashboard\/permissions/,
    permissions: ["permissions.manage"],
  },
  {
    pattern: /^\/dashboard\/coupons/,
    permissions: ["coupons.manage"],
  },
  {
    pattern: /^\/dashboard\/broadcasts/,
    permissions: ["broadcasts.manage"],
  },
  {
    pattern: /^\/dashboard\/payments/,
    permissions: ["payments.manage"],
  },
  {
    pattern: /^\/dashboard\/support/,
    permissions: ["support.manage"],
  },
  {
    pattern: /^\/dashboard\/content/,
    permissions: ["broadcasts.manage"],
  },
  {
    pattern: /^\/dashboard\/settings/,
    permissions: ["settings.manage"],
  },
];
