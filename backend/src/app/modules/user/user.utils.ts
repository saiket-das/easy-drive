import jwt from "jsonwebtoken";

export const generateToken = (
  jwtPayload: { email: string; role: string },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secret as string, { expiresIn });
};
