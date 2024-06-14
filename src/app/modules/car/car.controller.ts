import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

// Create a new car
const createCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.createCarService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car created successfully",
    data: result,
  });
});

// Get all cars
const getAllCars = catchAsync(async (req, res, next) => {
  const result = await CarServices.getAllCarsService();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cars retrieved successfully",
    data: result,
  });
});

// Get a single car
const getSingleCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.getSingleCarService(req.params.id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
};
