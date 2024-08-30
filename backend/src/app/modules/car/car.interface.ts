export interface CarProps {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  images?: string[];
  features: string[];
  pricePerHour: number;
  status?: string;
  isDeleted?: boolean;
}
