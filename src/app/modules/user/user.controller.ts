import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// Create a new user or signup
const signup = catchAsync(async (req, res, next) => {
  const result = await UserServices.signupService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully!",
    data: result,
  });
});

const login = catchAsync(async (req, res, next) => {
  const result = await UserServices.loginService(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User registered successfully!",
    data: result,
  });
});

export const UserControllers = {
  signup,
  login,
};
