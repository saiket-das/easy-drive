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

export const CarServices = {
  createCarService,
  getAllCarsService,
  getSingleCarService,
};
