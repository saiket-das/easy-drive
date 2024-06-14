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
  const id = req.params.id;
  const result = await CarServices.getSingleCarService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "A Car retrieved successfully",
    data: result,
  });
});

// Update a single car's info
const updateCarInfo = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const payload = req.body;
  const result = await CarServices.updateCarInfoCarService(id, payload);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car updated successfully",
    data: result,
  });
});

// Delete a car (isDeleted = true)
const deleteCar = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await CarServices.deleteCarService(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car deleted successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
  getAllCars,
  getSingleCar,
  updateCarInfo,
  deleteCar,
};
