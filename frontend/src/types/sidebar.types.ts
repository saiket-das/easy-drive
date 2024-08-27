import { ReactNode } from "react";

export type UserPathProps = {
  name?: string;
  path?: string;
  element?: ReactNode;
  children?: UserPathProps[];
  icon?: React.ReactNode;
};

export type RouteProps = {
  path: string;
  element: ReactNode;
};

export type SidebarItemProps =
  | {
      key: string | number;
      label: ReactNode;
      children?: SidebarItemProps[];
      icon?: React.ReactNode;
    }
  | undefined;
