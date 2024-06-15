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

  // send this response if the database collection is empty or no matching data is found
  if (result.length < 1) {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.NOT_FOUND,
      message: "No Data Found",
      data: [],
    });
  }
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
