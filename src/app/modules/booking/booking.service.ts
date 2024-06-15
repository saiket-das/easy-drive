import httpStatus from "http-status";
import { startSession, Types } from "mongoose";
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
  if (car.status !== "available") {
    throw new AppError(httpStatus.NOT_FOUND, "Car is not available");
  }

  const session = await startSession();
  try {
    // start session
    session.startTransaction();

    // Set userId and carId
    payload.user = user._id;
    payload.car = carId;

    // book a car - (transaction 1)
    const newBooking = await BookingModel.create([payload], { session });
    if (!newBooking.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to book a car");
    }

    // update car status(status = unavailable) - (transaction 2)
    const updateCarStatus = await CarModel.findByIdAndUpdate(
      carId,
      { status: "unavailable" },
      { session }
    );
    if (!updateCarStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to update car's status");
    }

    // populate the booking with user & car details and send it to client
    const bookingId = newBooking[0]._id;
    const result = BookingModel.findById(bookingId)
      .select("-__v")
      .populate("user", "-password -createdAt -updatedAt -__v")
      .populate("car", "-__v");

    await session.commitTransaction();
    await session.endSession();
    return result;
  } catch (error: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
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
