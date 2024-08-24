import { z } from "zod";
import { UserRole } from "./user.constant";

const createUserValidationSchema = z.object({
  body: z.object({
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
  }),
});

const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email address"),
    password: z
      .string({ required_error: "Password is required" })
      .min(6, "Password must be at least 6 characters long"),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  loginValidationSchema,
};
