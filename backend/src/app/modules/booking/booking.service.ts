import httpStatus from "http-status";
import { startSession, Types } from "mongoose";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errors/AppError";
import { BookingProps, ReturnProps } from "./booking.interface";
import { BookingModel } from "./booking.model";
import { UserModel } from "../user/user.model";
import { CarModel } from "../car/car.model";
import { calculateTotalCost } from "./booking.utils";
import { CarProps } from "../car/car.interface";

// Book a car (Only accessible to the User)
const createBookingService = async (
  userPayload: JwtPayload,
  carId: Types.ObjectId,
  payload: BookingProps
) => {
  // check is user exists or not
  const user = await UserModel.isUserExists(userPayload.email);

  // check is car exists or not
  const car = await CarModel.findById(carId);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found!");
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

// Book a car (Only accessible to the Admin)
const returnCarService = async (payload: ReturnProps) => {
  // check is booking exists or not
  const booking = await BookingModel.findById(payload.bookingId);
  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
  }

  const session = await startSession();
  try {
    // start session
    session.startTransaction();

    // check is car exists or not
    const car = await CarModel.findById(booking.car);
    if (!car) {
      throw new AppError(httpStatus.NOT_FOUND, "No Data Found");
    }

    // calculate total cost
    const startTime = booking.startTime;
    const endTime = payload.endTime as string;
    const pricePerHour = car.pricePerHour; // Extract car price per hour
    const totalCost = calculateTotalCost(startTime, endTime, pricePerHour);

    // set total cost in booking (totalCost: 1000) - (transaction 1)
    const updateBookingCost = await BookingModel.findByIdAndUpdate(
      payload.bookingId,
      { totalCost: totalCost, endTime: endTime },
      { session }
    );
    if (!updateBookingCost) {
      throw new AppError(httpStatus.NOT_FOUND, "Fail to update total cost");
    }

    // update car status(status: available) - (transaction 2)
    const updateCarStatus = await CarModel.findByIdAndUpdate(
      booking.car,
      { status: "available" },
      { session }
    );
    if (!updateCarStatus) {
      throw new AppError(httpStatus.BAD_REQUEST, "Fail to update car's status");
    }

    // populate the booking with user & car details and send it to client
    const result = BookingModel.findById(payload.bookingId)
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

export const BookingServices = {
  createBookingService,
  getAllBookingsService,
  getMyookingsService,
  returnCarService,
};
