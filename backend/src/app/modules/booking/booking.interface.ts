import { Types } from "mongoose";

export interface BookingProps {
  date: string;
  startTime: string; // Format: HH:mm
  endTime?: string; // Format: HH:mm
  user?: Types.ObjectId;
  car?: Types.ObjectId;
  totalCost: number;
  _id: Types.ObjectId;
}

export interface ReturnProps {
  bookingId: Types.ObjectId;
  endTime: string; // Format: HH:mm
}
