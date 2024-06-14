import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CarServices } from "./car.service";

// Create a new user or signup
const createCar = catchAsync(async (req, res, next) => {
  const result = await CarServices.createCarService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Car created successfully",
    data: result,
  });
});

export const CarControllers = {
  createCar,
};
