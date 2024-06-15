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
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }

  // check is car exists or not
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
  }

  // Set userId and carId
  payload.user = user._id;
  payload.car = carId;

  // book a car
  const newBooking = await BookingModel.create(payload);

  // populate the booking with user & car details and send it to client
  const result = await BookingModel.findById(newBooking._id)
    .populate("user", "-password")
    .populate("car");
  return result;
};

const getAllBookingService = async () => {
  const result = await BookingModel.find()
    .populate("user", "-password")
    .populate("car");

  return result;
};
export const BookingServices = {
  createBookingService,
  getAllBookingService,
};
