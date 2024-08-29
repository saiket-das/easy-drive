import { Router } from "express";
import { USER_ROLE } from "../user/user.constant";
import authorization from "../../middlewares/authorization";
import { PaymentControllers } from "./payment.controller";

const router = Router();

// Make payment
router.post(
  "/create-payment",
  // authorization(USER_ROLE.admin),
  PaymentControllers.createPayment
);

export const PaymentRoutes = router;
