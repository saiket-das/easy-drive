import { Calendar, LayoutDashboard } from "lucide-react";
import AdminDashboard from "../pages/Dashboard/admin/AdminDashboard";
import ROUTES from "../constants/routes";
import MyBooking from "../pages/Dashboard/user/MyBooking";

export const userPaths = [
  {
    name: "Dashboard",
    path: ROUTES.USER_DASHBOARD,
    element: <AdminDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "My Bookings",
    icon: <Calendar size={16} />,
    path: ROUTES.USER_MY_BOOKING,
    element: <MyBooking />,
  },
];
