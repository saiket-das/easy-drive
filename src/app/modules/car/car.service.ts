import { CarProps } from "./car.interface";
import { CarModel } from "./car.model";

const createCarService = async (payload: CarProps) => {
  const result = await CarModel.create(payload);
  return result;
};

export const CarServices = {
  createCarService,
};
