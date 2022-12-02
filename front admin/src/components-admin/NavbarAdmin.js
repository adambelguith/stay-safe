import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import * as Icons from "react-icons/fa";
import * as IconsGi from "react-icons/gi";
import * as IconsCg from "react-icons/cg";
import { navItems } from "./NavItems.js";
import Dropdown from './Dropdown';
import "./NavbarAdmin.css";
import './Dropdown.css';


import * as Iconai from "react-icons/ai";
import * as Iconsm from "react-icons/md";
import Badge_demands from "./Badge-demands";


function NavbarAdmin() {
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  //creating user
  const [user , setUser] = useState(null)

  const onMouseEnter = () => {
      setDropdown(true);
  };

  const onMouseLeave = () => {
      setDropdown(false);
  };


  // get userInfo from localStrage
  useEffect(()=> {
    setUser(JSON.parse(localStorage.getItem("userInfo")))
  }, [])
// ....

  useEffect(() => {
    if (window.innerWidth < 1065) {
      setMobile(true);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
        setSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="navbaradmin">
        
        <Link to="/admin/" className="navbar-logo" onClick={() => setSidebar(false)}>
          {/*   <IconsGi.GiFruiting />   */}
          <p className="half1">EFREZ</p><p>Ni</p>
        </Link>
        
        {!mobile && (
          <ul className="nav-items">
           
                <li className="nav-item">
                  <Link to="./demands">
                  <Iconai.AiOutlineUserAdd />
                    <span><Badge_demands /></span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link to="./manage-users">
                  <Iconsm.MdManageAccounts />
                    <span>Manage-Users</span>
                  </Link>
                </li>
      
          </ul>
        )}
                   
          <div
            className='nav-item-username'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <div className='name-client' >      
              <pre className="username">
                <IconsCg.CgProfile /> {user?.username} <Icons.FaCaretDown />
              </pre>
            </div>
            {dropdown && <Dropdown />}
          </div>

        {mobile && (
          <div className="sidebar-toggle">
            {sidebar ? (
              <Icons.FaTimes
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            ) : (
              <Icons.FaBars
                className="sidebar-toggle-logo"
                onClick={() => setSidebar(!sidebar)}
              />
            )}
          </div>
        )}
      </nav>

      <div className={sidebar ? "sidebar active" : "sidebar"}>
        <ul className="sidebar-items">
          
              <li     
                className="sidebar-item"
                onClick={() => setSidebar(false)}
              >
                <Link to="./demands">
                  <Iconai.AiOutlineUserAdd />
                    <span><Badge_demands /></span>
                  </Link>
              </li>

              <li     
                className="sidebar-item"
                onClick={() => setSidebar(false)}
              >
                <Link to="./manage-users">
                  <Iconsm.MdManageAccounts />
                    <span>Manage-Users</span>
                  </Link>
              </li>
            
        </ul>
      </div>
    </>
  );
}

export default NavbarAdmin;
