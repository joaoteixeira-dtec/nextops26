/* ──────────────────────── Roles & Permissions ──────────────────────── */

export type Role = "admin" | "comercial" | "tecnico";

export type Permission =
  | "dashboard:view"
  | "crm:view" | "crm:edit" | "crm:delete"
  | "clients:view" | "clients:edit" | "clients:delete"
  | "proposals:view" | "proposals:edit" | "proposals:delete"
  | "projects:view" | "projects:edit" | "projects:delete"
  | "tasks:view" | "tasks:edit" | "tasks:delete"
  | "invoices:view" | "invoices:edit" | "invoices:delete"
  | "team:view" | "team:edit" | "team:delete"
  | "reports:view"
  | "settings:view" | "settings:edit";

const PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    "dashboard:view",
    "crm:view", "crm:edit", "crm:delete",
    "clients:view", "clients:edit", "clients:delete",
    "proposals:view", "proposals:edit", "proposals:delete",
    "projects:view", "projects:edit", "projects:delete",
    "tasks:view", "tasks:edit", "tasks:delete",
    "invoices:view", "invoices:edit", "invoices:delete",
    "team:view", "team:edit", "team:delete",
    "reports:view",
    "settings:view", "settings:edit",
  ],
  comercial: [
    "dashboard:view",
    "crm:view", "crm:edit", "crm:delete",
    "clients:view", "clients:edit", "clients:delete",
    "proposals:view", "proposals:edit", "proposals:delete",
    "projects:view", "projects:edit", "projects:delete",
    "tasks:view", "tasks:edit", "tasks:delete",
    "invoices:view", "invoices:edit", "invoices:delete",
    "team:view", "team:edit", "team:delete",
    "reports:view",
    "settings:view", "settings:edit",
  ],
  tecnico: [
    "dashboard:view",
    "crm:view", "crm:edit", "crm:delete",
    "clients:view", "clients:edit", "clients:delete",
    "proposals:view", "proposals:edit", "proposals:delete",
    "projects:view", "projects:edit", "projects:delete",
    "tasks:view", "tasks:edit", "tasks:delete",
    "invoices:view", "invoices:edit", "invoices:delete",
    "team:view", "team:edit", "team:delete",
    "reports:view",
    "settings:view", "settings:edit",
  ],
};

export function hasPermission(role: Role | undefined, permission: Permission): boolean {
  if (!role) return false;
  const perms = PERMISSIONS[role];
  if (!perms) return false;
  return perms.includes(permission);
}

export function getPermissions(role: Role): Permission[] {
  return PERMISSIONS[role];
}

export const ROLE_LABELS: Record<Role, string> = {
  admin: "Administrador",
  comercial: "Comercial",
  tecnico: "Técnico",
};
