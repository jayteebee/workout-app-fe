import React, { useState } from "react";
import "../../CSS/NavBar.css";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu';

const NavBarMenu = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleStateChange = (state) => {
    setMenuOpen(state.isOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
    <Menu right isOpen={menuOpen} onStateChange={handleStateChange}>
      <Link to="/" onClick={closeMenu} ><h2>Home</h2></Link>
      <Link to="/Profile" onClick={closeMenu}><h2>Profile</h2></Link>
      <Link to="/Knowledge" onClick={closeMenu}><h2>Knowledge</h2></Link>
      <Link to="/Analytics" onClick={closeMenu}><h2>Analytics</h2></Link>
      <Link to="/Logs" onClick={closeMenu}><h2>Logs</h2></Link>
    </Menu>
    </div>
  );
};

export default NavBarMenu;
