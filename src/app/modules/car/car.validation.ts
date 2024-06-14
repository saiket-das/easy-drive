import { z } from "zod";

const createCarSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "Name is required" }),
    description: z.string({ required_error: "Description is required" }),
    color: z.string({ required_error: "Color is required" }),
    isElectric: z.boolean(),
    status: z.string().optional().default("available"),
    features: z.array(z.string({ required_error: "Features are required" })),
    pricePerHour: z
      .number({ required_error: "Price is required" })
      .positive("Price per hour must be a positive number"),
    isDeleted: z.boolean().optional().default(false),
  }),
});

const updateCarSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    color: z.string().optional(),
    isElectric: z.boolean().optional(),
    status: z.string().optional(),
    features: z.array(z.string()).optional(),
    pricePerHour: z
      .number()
      .positive("Price per hour must be a positive number")
      .optional(),
  }),
});

export const CarValidations = {
  createCarSchema,
  updateCarSchema,
};
