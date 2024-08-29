import { model, Schema } from "mongoose";
import { PaymentProps } from "./payment.interface";

const paymentSchema = new Schema<PaymentProps>(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      required: true,
    },
    stripePaymentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const PaymentModel = model<PaymentProps>("Payment", paymentSchema);
