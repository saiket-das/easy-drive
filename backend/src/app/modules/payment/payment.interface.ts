import { Types } from "mongoose";

export interface PaymentProps {
  bookingId: Types.ObjectId;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  stripePaymentId: string;
  _id: Types.ObjectId;
}
