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

// Get all bookings (Accessible to the Admin)
const getAllBookings = catchAsync(async (req, res, next) => {
  const result = await BookingServices.getAllBookingsService();
  console.log(result);

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

// Get a user's bookings (Accessible to the User)
const getMyookings = catchAsync(async (req, res, next) => {
  const { email } = req.user;
  const result = await BookingServices.getMyookingsService(email);
  console.log(result);
  // send this response if the database collection is empty or no matching data is found
  if (result.length < 1) {
    console.log("Wrong place");
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
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

// Return the car (Accessible to the Admin)
const returnCar = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await BookingServices.returnCarService(payload);

  // send this response if the database collection is empty or no matching data is found
  // if (result.length < 1) {
  //   sendResponse(res, {
  //     success: false,
  //     statusCode: httpStatus.NOT_FOUND,
  //     message: "No Data Found",
  //     data: [],
  //   });
  // }
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "My Bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  getMyookings,
  returnCar,
};
