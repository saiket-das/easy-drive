import { NavLink } from "react-router-dom";
import { SidebarItemProps, UserPathProps } from "../types";

export const sidebarItemsGenerator = (items: UserPathProps[], role: string) => {
  const sidebarItems = items.reduce((acc: SidebarItemProps[], item, index) => {
    if (item.name && item.path) {
      acc.push({
        key: item.name,
        label: <NavLink to={`/${role}/${item.path}`}> {item.name} </NavLink>,
        icon: item.icon,
      });
    }
    if (item.children) {
      acc.push({
        key: item.name || index,
        label: item.name,
        icon: item.icon,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
              ),
            };
          }
        }),
      });
    }
    return acc;
  }, []);
  return sidebarItems;
};
