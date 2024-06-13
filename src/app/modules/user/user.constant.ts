// Define user roles as a constant
export const USER_ROLE = {
  USER: "user",
  ADMIN: "admin",
} as const;

export enum UserRole {
  User = "user",
  Admin = "admin",
}

// Create a type based on the roles
export type UserRoleProps = keyof typeof USER_ROLE;
