import { UserProps } from "../redux/features/auth/authSlice";
import { CarProps } from "./car.types";

export interface BookingProps {
  _id: string;
  date: string;
  startTime: string;
  endTime: unknown;
  user: UserProps;
  car: CarProps;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}
