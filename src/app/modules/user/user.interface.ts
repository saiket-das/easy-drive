import { UserRoleProps } from "./user.constant";

export interface UserProps {
  name: string;
  email: string;
  role: UserRoleProps;
  password: string;
  phone: string;
  address: string;
}
