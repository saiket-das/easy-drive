import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { CarProps } from "./car.interface";
import { CarModel } from "./car.model";

// Create a new car
const createCarService = async (payload: CarProps) => {
  const result = await CarModel.create(payload);
  return result;
};

// Get all cars
const getAllCarsService = async () => {
  const result = await CarModel.find();
  return result;
};

// Get a single car
const getSingleCarService = async (id: string) => {
  const result = await CarModel.findById(id);
  return result;
};

// Update a single car's info
const updateCarInfoCarService = async (
  id: string,
  payload: Partial<CarProps>
) => {
  const car = await CarModel.findById(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }

  const result = await CarModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const CarServices = {
  createCarService,
  getAllCarsService,
  getSingleCarService,
  updateCarInfoCarService,
};
