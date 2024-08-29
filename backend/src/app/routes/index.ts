import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CarRoutes } from "../modules/car/car.route";
import { BookingRoutes } from "../modules/booking/booking.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const moduleRoute = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/cars",
    route: CarRoutes,
  },
  {
    path: "/bookings",
    route: BookingRoutes,
  },
  {
    path: "/payments",
    route: PaymentRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
