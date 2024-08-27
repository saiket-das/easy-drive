import {
  Calendar,
  Car,
  CircleDollarSign,
  LayoutDashboard,
  Plus,
} from "lucide-react";
import AdminDashboard from "../pages/Dashboard/Admin/AdminDashboard";
import ROUTES from "../constants/routes";
import Cars from "../pages/Dashboard/Admin/Cars";
import Bookings from "../pages/Dashboard/Admin/Booking";
import ReturnCar from "../pages/Dashboard/Admin/ReturnCar";
import AddCar from "../pages/Dashboard/Admin/AddCar";

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
    icon: <Plus size={16} />,
    path: ROUTES.ADMIN_ADD_CAR,
    element: <AddCar />,
  },
  {
    name: "Booking",
    icon: <Calendar size={16} />,
    path: ROUTES.ADMIN_BOOKING,
    element: <Bookings />,
  },
  {
    name: "Return Car",
    icon: <CircleDollarSign size={16} />,
    path: ROUTES.ADMIN_RETURN_CAR,
    element: <ReturnCar />,
  },
];
