import { Types } from "mongoose";

export interface BookingProps {
  date: string;
  startTime: string;
  endTime?: string;
  user?: Types.ObjectId;
  car?: Types.ObjectId;
  totalCost: number;
  isPaid: Types.ObjectId;
  _id: Types.ObjectId;
}

export interface ReturnProps {
  bookingId: Types.ObjectId;
  endTime: string;
}
