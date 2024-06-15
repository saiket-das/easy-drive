import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.service";

// Book a car (Only accessible to the User)
const createBooking = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { carId, ...rest } = req.body;

  const result = await BookingServices.createBookingService(user, carId, rest);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});

// Book a car (Only accessible to the User)
const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsService();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car booked successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
};
