import { model, Schema } from "mongoose";
import { CarProps } from "./car.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const carSchema = new Schema<CarProps>(
  {
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
  },
  {
    timestamps: true,
  }
);

// Pre-find hook to exclude deleted cars before fatching
carSchema.pre("find", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

carSchema.pre("findOne", function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

// Pre-hook to check if car exists or not
carSchema.pre("findOneAndUpdate", async function (next) {
  const id = this.getQuery()._id;

  const car = await CarModel.findById(id);
  if (!car) {
    throw new AppError(httpStatus.NOT_FOUND, "Car not found");
  }
  next();
});
export const CarModel = model<CarProps>("Car", carSchema);
