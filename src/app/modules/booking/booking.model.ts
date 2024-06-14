import { model, Schema } from "mongoose";
import { BookingProps } from "./booking.interface";

const bookingSchema = new Schema<BookingProps>(
  {
    date: {
      type: Date,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ef: "User",
      required: true,
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
    },
    totalCost: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<BookingProps>("Booking", bookingSchema);
