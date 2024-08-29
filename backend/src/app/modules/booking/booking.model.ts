import { model, Schema } from "mongoose";
import { BookingProps } from "./booking.interface";

const bookingSchema = new Schema<BookingProps>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      default: null,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    totalCost: {
      type: Number,
      default: 0,
    },
    isPaid: {
      type: Schema.Types.ObjectId,
      ref: "Payment",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const BookingModel = model<BookingProps>("Booking", bookingSchema);
