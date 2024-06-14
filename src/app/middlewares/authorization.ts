import { NextFunction, Request, Response } from "express";

import catachAsync from "../utils/catchAsync";
import AppError from "../errors/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { UserRoleProps } from "../modules/user/user.constant";
import { UserModel } from "../modules/user/user.model";

interface CustomRequest extends Request {
  user: JwtPayload;
}

// Validate JWT
const auth = (...requireRoles: UserRoleProps[]) => {
  return catachAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;

      // check is token is sent from client
      if (!token) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
      }

      // check is Token valid or not
      const decoded = jwt.verify(
        token,
        config.jwt_access_token as string
      ) as JwtPayload;

      // check is Role is valid or not
      const { userId, role, iat } = decoded;
      if (requireRoles && !requireRoles.includes(role)) {
        throw new AppError(httpStatus.FORBIDDEN, "You are not authorized!");
      }

      const user = await UserModel.isUserExists(userId);
      // check is user exists or not
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found!");
      }

      req.user = decoded as JwtPayload;
      next();
    }
  );
};

export default auth;
