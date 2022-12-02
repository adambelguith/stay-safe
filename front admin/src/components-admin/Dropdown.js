import React, { useState } from 'react';
import { MenuItems } from './MenuItems';
import './Dropdown.css';
import { Link } from 'react-router-dom';

import * as Icons from "react-icons/ri";
import * as Iconsh from "react-icons/hi";



function Dropdown() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
       
            <li>
              <Link
                className='dropdown-link'
                to='./update'
                onClick={() => setClick(false)}
              >
                <p className='drop-item'>
                <Iconsh.HiOutlinePencil/> &nbsp; Edit Profile </p>
              </Link>
            </li>

            <li>
              <Link
                className='dropdown-link'
                to='/signin'
                onClick={() => {
                localStorage.removeItem("userInfo");
                  setClick(false)}}
              >
                <p className='drop-item'>
                <Icons.RiLogoutCircleLine /> &nbsp; Logout </p>
              </Link>
            </li>
  
      </ul>
    </>
  );
}

export default Dropdown;
