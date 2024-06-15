import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingValidations } from "./booking.validation";
import { BookingControllers } from "./booking.controller";
import authorization from "../../middlewares/authorization";
import { USER_ROLE } from "../user/user.constant";

const router = Router();

// Book a car (Only accessible to the User)
router.post(
  "/",
  authorization(USER_ROLE.user),
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.createBooking
);

// Get all bookings (Accessible to the Admin)
router.get(
  "/",
  authorization(USER_ROLE.admin),
  BookingControllers.getAllBookings
);

export const BookingRoutes = router;
