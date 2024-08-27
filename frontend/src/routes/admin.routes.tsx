import { Calendar, Car, CircleDollarSign, LayoutDashboard } from "lucide-react";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import ROUTES from "../constants/routes";
import Cars from "../pages/Dashboard/admin/Cars";
import Bookings from "../pages/Dashboard/admin/Booking";
import ReturnCar from "../pages/Dashboard/admin/ReturnCar";

export const adminPaths = [
  {
    name: "Dashboard",
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "Cars",
    icon: <Car size={16} />,
    path: ROUTES.ADMIN_CARS,
    element: <Cars />,
  },
  {
    name: "Booking",
    icon: <Calendar size={16} />,
    path: ROUTES.ADMIN_CARS,
    element: <Bookings />,
  },
  {
    name: "Return Car",
    icon: <CircleDollarSign size={16} />,
    path: ROUTES.ADMIN_RETURN_CAR,
    element: <ReturnCar />,
  },
];
