import { Router } from "express";

import validateRequest from "../../middlewares/validateRequest";
import { USER_ROLE } from "../user/user.constant";
import { CarValidations } from "./car.validation";
import authorization from "../../middlewares/authorization";
import { CarControllers } from "./car.controller";

const router = Router();

// Create a new car
router.post(
  "/",
  authorization(USER_ROLE.admin),
  validateRequest(CarValidations.createCarSchema),
  CarControllers.createCar
);

export const CarRoutes = router;
