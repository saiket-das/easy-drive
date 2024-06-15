import { JwtPayload } from "jsonwebtoken";
import { BookingProps } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { UserModel } from "../user/user.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import { Types } from "mongoose";
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

  const result = (
    await (await BookingModel.create(payload)).populate("user")
  ).populate("car");
  return result;
};

export const BookingServices = {
  createBookingService,
};
