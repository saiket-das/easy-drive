import { Types } from "mongoose";

export interface BookingProps {
  date: Date;
  user: Types.ObjectId;
  car: Types.ObjectId;
  startTime: string; // Format: HH:mm
  endTime?: string; // Format: HH:mm
  totalCost: number;
}
