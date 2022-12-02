import * as Icons from "react-icons/ri";
import * as Iconsh from "react-icons/hi";
import * as Iconsf from "react-icons/fa";

export const MenuItems = [
  {
    title: "Data",
    path: "./data",
    cName: 'dropdown-link',
    icon: <Iconsf.FaFileDownload />,
  },
  {
    icon: <Iconsh.HiOutlinePencil/>,
    title: 'Edit Profile',
    path: 'update',
    cName: 'dropdown-link',
    
  },
  {
    title: 'Logout',
    path: '/',
    cName: 'dropdown-link',
    icon: <Icons.RiLogoutCircleLine />,
  },

];
