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

export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: MenuItemType[];
}

export type ItemType<T> = T;

// export type SidebarItemProps =
//   | {
//       key: string | number;
//       label: ReactNode;
//       children?: SidebarItemProps[];
//       icon?: React.ReactNode;
//     }
//   | undefined;

export interface SidebarItemProps {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  children?: SidebarItemProps[];
}
