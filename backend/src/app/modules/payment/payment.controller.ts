import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { PaymentServices } from "./payment.service";

// Return the car (Accessible to the Admin)
const createPayment = catchAsync(async (req, res, next) => {
  const payload = req.body;
  const result = await PaymentServices.createPaymentService(payload);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Payment made successfully",
    data: result,
  });
});

export const PaymentControllers = {
  createPayment,
};
