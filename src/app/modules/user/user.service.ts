import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { UserModel } from "./user.model";
import { LoginUserProps, UserProps } from "./user.interface";
import { generateToken } from "./user.utils";

// Create a new user or signup
const signupService = async (payload: UserProps) => {
  const result = await UserModel.create(payload);
  const { password, ...userWithoutPassword } = result.toObject();
  return userWithoutPassword;
};

// Login
const loginService = async (payload: LoginUserProps) => {
  const user = await UserModel.isUserExists(payload.email);
  // check is user exists or not
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found!");
  }
  // check is give password correct or not
  const plainPassword = payload.password;
  const hashPassword = user.password;
  if (!(await UserModel.isPasswordMatched(plainPassword, hashPassword))) {
    throw new AppError(httpStatus.FORBIDDEN, "Wrong password!");
  }

  // Payload of JWT
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  // Generate a Access Token
  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires_in as string
  );

  const { password, ...userWithoutPassword } = user.toObject();

  return {
    accessToken,
    user: userWithoutPassword,
  };
};

export const UserServices = {
  signupService,
  loginService,
};
