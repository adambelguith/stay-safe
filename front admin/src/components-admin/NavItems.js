import * as Icons from "react-icons/ai";
import * as Iconsm from "react-icons/md";
import Badge_demands from "./Badge-demands";

export const navItems = [
  {
    id: 1,
    title: <Badge_demands />,
    path: "./demands",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Icons.AiOutlineUserAdd />,
  },
  {
    id: 2,
    title: "Manage-Users",
    path: "./manage-users",
    nName: "nav-item",
    sName: "sidebar-item",
    icon: <Iconsm.MdManageAccounts />,
  },

];
