import { Types } from "mongoose";

export interface PaymentProps {
  bookingId: Types.ObjectId;
  amount: number;
  paymentMethod: string;
  currency: string;
  paymentStatus: string;
  stripePaymentId: string;
  _id: Types.ObjectId;
}
