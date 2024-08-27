import { Calendar, LayoutDashboard } from "lucide-react";
import ROUTES from "../constants/routes";
import MyBooking from "../pages/Dashboard/user/MyBooking";
import StudentDashboard from "../pages/Dashboard/user/StudentDashboard";

export const userPaths = [
  {
    name: "Dashboard",
    path: ROUTES.USER_DASHBOARD,
    element: <StudentDashboard />,
    icon: <LayoutDashboard size={16} />,
  },
  {
    name: "My Bookings",
    icon: <Calendar size={16} />,
    path: ROUTES.USER_MY_BOOKING,
    element: <MyBooking />,
  },
];
