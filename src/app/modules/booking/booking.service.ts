import httpStatus from "http-status";
import { Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { BookingProps } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { UserModel } from "../user/user.model";
import { CarModel } from "../car/car.model";

// Book a car (Only accessible to the User)
const createBookingService = async (
  userPayload: JwtPayload,
  //   carId: string,
  carId: Types.ObjectId,
  payload: BookingProps
) => {
  // check is user exists or not
  const user = await UserModel.isUserExists(userPayload.email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  // check is car exists or not
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  // Set userId and carId
  payload.user = user._id;
  payload.car = carId;

  // book a car
  const newBooking = await BookingModel.create(payload);

  // populate the booking with user & car details and send it to client
  const result = await BookingModel.findById(newBooking._id)
    .select("-__v")
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  return result;
};

// Get all bookings (Accessible to the Admin)
const getAllBookingsService = async () => {
  const result = await BookingModel.find()
    .select("-__v")
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  return result;
};

// Get a user's bookings (Accessible to the User)
const getMyookingsService = async (email: string) => {
  // check is user exists or not
  const user = await UserModel.isUserExists(email);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  // get specifc user's all booking
  const result = await BookingModel.find({ user: user._id })
    .select("-__v")
    .populate("user", "-password -createdAt -updatedAt -__v")
    .populate("car", "-__v");

  return result;
};
export const BookingServices = {
  createBookingService,
  getAllBookingsService,
  getMyookingsService,
};
