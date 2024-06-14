import { z } from "zod";

export const createBookingSchema = z.object({
  date: z.date(),
  user: z.string({ required_error: "User ID is required" }),
  car: z.string({ required_error: "Car ID is required" }),
  startTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: "Invalid time format, should be HH:mm",
  }),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, {
      message: "Invalid time format, should be HH:mm",
    })
    .optional(),
  totalCost: z.number().nonnegative().default(0),
});

export const BookingValidations = {
  createBookingSchema,
};
