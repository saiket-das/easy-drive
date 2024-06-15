import { z } from "zod";

export const createBookingSchema = z.object({
  body: z.object({
    date: z.string(),
    // user: z.string().optional(),
    // car: z.string().optional(),
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
  }),
});

export const BookingValidations = {
  createBookingSchema,
};
