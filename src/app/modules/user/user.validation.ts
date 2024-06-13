import { z } from "zod";
import { UserRole } from "./user.constant";

const createUserSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  role: z.nativeEnum(UserRole, {
    invalid_type_error: "Role must be either 'user' or 'admin'",
  }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters long"),
  phone: z.string({ required_error: "Phone number is required" }),
  address: z.string({ required_error: "Address is required" }),
});

export const UserValidations = { createUserSchema };
