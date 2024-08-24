import { Model, Types } from "mongoose";
import { UserRoleProps } from "./user.constant";

export interface UserProps {
  name: string;
  email: string;
  role: UserRoleProps;
  password: string;
  phone: string;
  address: string;
  _id: Types.ObjectId;
}

export interface LoginUserProps {
  email: string;
  password: string;
}

export interface StaticUserModel extends Model<UserProps> {
  // is user exists
  isUserExists(id: string): Promise<UserProps>;

  // given password & Database password match
  isPasswordMatched(
    plainPassword: string,
    hashPassword: string
  ): Promise<Boolean>;
}
