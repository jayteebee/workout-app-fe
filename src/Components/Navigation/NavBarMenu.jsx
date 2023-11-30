import React from "react";
import "../../CSS/NavBar.css";
import { Link } from "react-router-dom";

const NavBarMenu = ({ setShowMenu }) => {

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div className="hamburgerMenu">
    <Link to="/" onClick={toggleMenu}>
        <h2>Home</h2>
      </Link>

      <Link to="/Profile" onClick={toggleMenu}>
        <h2>Profile</h2>
      </Link>
      <Link to="/Knowledge" onClick={toggleMenu}>
        <h2>Knowledge</h2>
      </Link>
      <Link to="/Analytics" onClick={toggleMenu}>
        <h2>Analytics</h2>
      </Link>
      <Link to="/Logs" onClick={toggleMenu}>
        <h2>Logs</h2>
      </Link>
    </div>
  );
};

export default NavBarMenu;
