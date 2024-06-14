import { model, Schema } from "mongoose";
import { CarProps } from "./car.interface";

const carSchema = new Schema<CarProps>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    default: "available",
  },
  features: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

export const CarModel = model<CarProps>("User", carSchema);
