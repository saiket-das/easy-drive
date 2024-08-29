import { Calendar, Car, CirclePlus, LayoutDashboard } from "lucide-react";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import ROUTES from "../constants/routes";
import Cars from "../pages/Dashboard/Admin/Cars";
import AddCar from "../pages/Dashboard/Admin/AddCar";
import Bookings from "../pages/Dashboard/Admin/Bookings";

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
