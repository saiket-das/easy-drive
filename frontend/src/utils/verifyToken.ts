import { jwtDecode } from "jwt-decode";
import { UserProps } from "../redux/features/auth/authSlice";

export const verifyToken = (token: string): UserProps => {
  return jwtDecode(token);
};
