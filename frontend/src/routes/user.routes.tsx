import { Calendar, LayoutDashboard } from "lucide-react";
import ROUTES from "../constants/routes";
import MyBooking from "../pages/Dashboard/User/MyBooking";

import UserDashboard from "../pages/Dashboard/User/UserDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: ROUTES.USER_DASHBOARD,
    element: <UserDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "My Bookings",
    icon: <Calendar size={16} />,
    path: ROUTES.USER_MY_BOOKING,
    element: <MyBooking />,
  },
];
