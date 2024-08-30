// import { NavLink } from "react-router-dom";
// import { SidebarItemProps, UserPathProps } from "../types";

// export const sidebarItemsGenerator = (items: UserPathProps[], role: string) => {
//   const sidebarItems = items.reduce((acc: SidebarItemProps[], item, index) => {
//     if (item.name && item.path) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/${role}/${item.path}`}> {item.name} </NavLink>,
//         icon: item.icon,
//       });
//     }
//     if (item.children) {
//       acc.push({
//         key: item.name || index,
//         label: item.name,
//         icon: item.icon,
//         children: item.children.map((child) => {
//           if (child.name) {
//             return {
//               key: child.name,
//               label: (
//                 <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
//               ),
//             };
//           }
//         }),
//       });
//     }
//     return acc;
//   }, []);
//   return sidebarItems;
// };

import { NavLink } from "react-router-dom";
import { ItemType, MenuItemType, UserPathProps } from "../types";

export const sidebarItemsGenerator = (
  items: UserPathProps[],
  role: string
): ItemType<MenuItemType>[] => {
  const sidebarItems: ItemType<MenuItemType>[] = items.reduce(
    (acc: ItemType<MenuItemType>[], item, index) => {
      if (item.name && item.path) {
        acc.push({
          key: item.name,
          label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
          icon: item.icon,
        });
      }

      if (item.children) {
        const childItems: ItemType<MenuItemType>[] = item.children
          .map((child) => {
            if (child.name && child.path) {
              return {
                key: child.name,
                label: (
                  <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                ),
              } as ItemType<MenuItemType>; // Ensure correct type
            }
            return undefined; // Explicitly return undefined for invalid children
          })
          .filter(
            (child): child is ItemType<MenuItemType> => child !== undefined
          ); // Filter out undefined values

        if (childItems.length > 0) {
          acc.push({
            key: item.name || index.toString(),
            label: item.name || "",
            icon: item.icon,
            children: childItems,
          });
        }
      }

      return acc;
    },
    []
  );

  return sidebarItems;
};
