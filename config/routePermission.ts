export const routePermissions: Record<string, string[]> = {
  //   User Management
  "/dashboard/admin/manage-users": ["USERS VIEW"],
  "/dashboard/admin/approve-user": ["USERS VIEW"],

  // Product Management
  "/dashboard/admin/products/all-products": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/id": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/add-product": ["PRODUCTS CREATE"],
  "/dashboard/admin/products/draft-products": [
    "PRODUCTS VIEW",
    "PRODUCTS UPDATE",
    "PRODUCTS DELETE",
  ],
  "/dashboard/admin/products/low-stock-products": [
    "PRODUCTS VIEW",
    "PRODUCTS UPDATE",
    "PRODUCTS DELETE",
  ],
  "/dashboard/admin/products/deleted": ["PRODUCTS VIEW"],
  "/dashboard/admin/products/inventory": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/reviews": ["PRODUCTS VIEW", "PRODUCTS UPDATE"],
  "/dashboard/admin/products/bulk-upload": ["PRODUCTS VIEW", "PRODUCTS DELETE"],

  //category management
  "/dashboard/admin/product-category/parent-category": [
    "CATEGORIES CREATE",
    "CATEGORIES VIEW",
    "CATEGORIES UPDATE",
    "CATEGORIES DELETE",
  ],
  "/dashboard/admin/product-category/sub-category": [
    "SUBCATEGORIES CREATE",
    "SUBCATEGORIES VIEW",
    "SUBCATEGORIES UPDATE",
    "SUBCATEGORIES DELETE",
  ],

  // combo management
  "/dashboard/combo": ["PACKAGES VIEW"],
  "/dashboard/combo/create-combo": ["PACKAGES CREATE"],
  "/dashboard/combo/combo-draft": ["PACKAGES VIEW"],

  // Customer Management
  "/dashboard/customers": ["CUSTOMERS VIEW"],
  "/dashboard/customers/add": ["CUSTOMERS CREATE"],
  "/dashboard/customers/overview": ["CUSTOMERS VIEW"],

  // ORDERS Management
  "/dashboard/agent/orders/my-orders": ["ORDERS VIEW OWN"],
  "/dashboard/agent/orders/create-order": ["ORDERS CREATE"],
  "/dashboard/admin/orders/top-sellers": ["ORDERS VIEW"],
  "/dashboard/admin/orders/overview": ["ORDERS VIEW"],
  "/dashboard/admin/orders/refunds": ["ORDERS VIEW"],
  "/dashboard/admin/orders": ["ORDERS VIEW"],

  // role Management
  "/dashboard/hr&staff/roles": ["ROLES MANAGE"],
  "/dashboard/hr&staff/staff/add": ["USERS CREATE"],

  // leads management of admin
  "/dashboard/leads/admin/all-teams": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],
  "/dashboard/leads/admin/assign-customer": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],

  // lead management of leaders
  "/dashboard/leads/leaders": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],
  "/dashboard/leads": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],
  "/dashboard/leads/lead-overview": [
    "ALLOCATIONS ASSIGN LEADER",
    "ALLOCATIONS DISTRIBUTE",
    "ALLOCATIONS REPORTS VIEW",
    "ALLOCATIONS REPORTS VIEW OWN",
    "ALLOCATIONS VIEW OWN",
  ],
  // lead management of agents
  "/dashboard/leads/agents": ["ALLOCATIONS VIEW OWN"],

  // team leader management
  "/dashboard/team/overview": ["ALLOCATIONS REPORTS VIEW"],
  "/dashboard/team": ["ALLOCATIONS REPORTS VIEW"],
  "/dashboard/team/assign-leads": ["ALLOCATIONS REPORTS VIEW"],

  // audit and history
  "/dashboard/activity": ["AUDIT VIEW"],

  // route permission
  "/dashboard/reports": ["REPORTS VIEW"],
  "/dashboard/hourly-report": ["REPORTS VIEW"],

  //complain permission
  // "/dashboard/agent/complaint":["COMPLAIN CREATE, COMPLAIN VIEW", "COMPLAIN UPDATE", "COMPLAIN DELETE"]
  "/dashboard/agents-report": ["AGENT-REPORTS VIEW"],
  "/dashboard/agent/complaint": [
    "COMPLAIN VIEW",
    "COMPLAIN CREATE",
    "COMPLAIN UPDATE",
    "COMPLAIN DELETE",
  ],
};
