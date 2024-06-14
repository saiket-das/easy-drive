import bcrypt from "bcrypt";
import config from "../../config";
import { LoginUserProps, UserProps } from "./user.interface";
import { UserModel } from "./user.model";

// Create a new user or signup
const signupService = async (payload: UserProps) => {
  const result = await UserModel.create(payload);
  return result;
};

// Login
const loginService = async (payload: LoginUserProps) => {
  const result = await UserModel.create(payload);
  return result;
};

export const UserServices = {
  signupService,
  loginService,
};
