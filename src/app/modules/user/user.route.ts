import { Router } from "express";
import { UserControllers } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = Router();

// Create a new user or signup
router.post(
  "/signup",
  validateRequest(UserValidations.createUserValidationSchema),
  UserControllers.signup
);

// Login
router.post(
  "/login",
  validateRequest(UserValidations.loginValidationSchema),
  UserControllers.login
);

export const UserRoutes = router;
