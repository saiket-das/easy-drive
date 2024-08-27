export const ROLE = {
  user: "user",
  admin: "admin",
} as const;

export type UserRoleProps = keyof typeof ROLE;
