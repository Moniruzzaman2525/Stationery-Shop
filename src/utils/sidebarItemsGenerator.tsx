import { NavLink } from "react-router-dom";
import { TSlideBarItem, TUserPath } from "../types";

export const sidebarItemsGenerator = (items: TUserPath[]) => {
    const sidebarItem = items.reduce((acc: TSlideBarItem[], item) => {
      if (item.path && item.name) {
        acc.push({
          key: item.path,
          label: item.children ? item.name : <NavLink to={`/${item.path}`}>{item.name}</NavLink>, // Only use NavLink if no children
        });
      }
  
      if (item.children) {
        acc.push({
          key: item.name,
          label: item.name,
          children: item.children.map((child) => {
            if (child.name) {
              return {
                key: child.name,
                label: <NavLink to={`/dashboard/${child.path}`}>{child.name}</NavLink>,
              };
            }
          }),
        });
      }
      return acc;
    }, []);
  
    return sidebarItem;
  };
  