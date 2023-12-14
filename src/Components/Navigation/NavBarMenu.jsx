import React, { useEffect, useState } from "react";
import "../../CSS/NavBar.css";
import { Link, useLocation } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

const NavBarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const location = useLocation()

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isCurrentPage = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    if (menuOpen) {
      // Focus the menu container itself
      document.querySelector('.bm-menu-wrap').setAttribute('tabindex', '-1');
      document.querySelector('.bm-menu-wrap').focus();
    }
  }, [menuOpen]);
  return (
    <div>
    <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
    <Link className={`menu-item ${isCurrentPage('/') ? 'active' : ''}`} to="/" onClick={closeMenu}><h2>Home</h2></Link>
    <Link className={`menu-item ${isCurrentPage('/Routines') ? 'active' : ''}`} to="/Routines" onClick={closeMenu}><h2>Routines</h2></Link>
    <Link className={`menu-item ${isCurrentPage('/Profile') ? 'active' : ''}`} to="/Profile" onClick={closeMenu}><h2>Profile</h2></Link>
    <Link className={`menu-item ${isCurrentPage('/Knowledge') ? 'active' : ''}`} to="/Knowledge" onClick={closeMenu}><h2>Knowledge</h2></Link>
    <Link className={`menu-item ${isCurrentPage('/Analytics') ? 'active' : ''}`} to="/Analytics" onClick={closeMenu}><h2>Analytics</h2></Link>
    <Link className={`menu-item ${isCurrentPage('/Logs') ? 'active' : ''}`} to="/Logs" onClick={closeMenu}><h2>Logs</h2></Link>
    </Menu>
    </div>
  );
};

export default NavBarMenu;
