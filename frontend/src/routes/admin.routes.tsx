import { Calendar, Car, CirclePlus, LayoutDashboard } from "lucide-react";
import ROUTES from "../constants/routes";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import Bookings from "../pages/Dashboard/admin/Booking/Bookings";
import AddCar from "../pages/Dashboard/admin/AddCar";
import Cars from "../pages/Dashboard/admin/Cars";

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
    name: "Add Car",
    icon: <CirclePlus size={16} />,
    path: ROUTES.ADMIN_ADD_CAR,
    element: <AddCar />,
  },
  {
    name: "Booking",
    icon: <Calendar size={16} />,
    path: ROUTES.ADMIN_BOOKING,
    element: <Bookings />,
  },
];
