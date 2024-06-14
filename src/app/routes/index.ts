import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CarRoutes } from "../modules/car/car.route";

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
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

export default router;
