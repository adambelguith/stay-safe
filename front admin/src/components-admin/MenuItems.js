import * as Icons from "react-icons/ri";
import * as Iconsh from "react-icons/hi";

export const MenuItems = [
  {
    icon: <Iconsh.HiOutlinePencil/>,
    title: 'Edit Profile',
    path: './update',
    cName: 'dropdown-link',
    
  },
  {
    title: 'Logout',
    path: '../',
    cName: 'dropdown-link',
    icon: <Icons.RiLogoutCircleLine />,
  },

];
