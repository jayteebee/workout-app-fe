import React from "react";
import { useState } from "react";
import HamburgerMenu from "../../StyleResources/HamburgerMenu.png";
import NavBarMenu from "./NavBarMenu";
import "../../CSS/NavBar.css";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";

const NavBar = ({ setShowMenu, showMenu }) => {
  // const [showMenu, setShowMenu] = useState(false)

  const toggleMenu = () => {
    setShowMenu((prevState) => !prevState);
  };

  return (
    <div className="navigationBar">
      <div className="backButton">
        <BackButton />
      </div>

      <div className="routineLink">
        <Link to="/Routines">
          <p>Create/View Routines</p>
        </Link>

        <img
          src={HamburgerMenu}
          alt="Menu"
          onClick={toggleMenu}
          className="colored-hamburger"
        />
      </div>
      {showMenu ? <NavBarMenu setShowMenu={setShowMenu} /> : null}
    </div>
  );
};

export default NavBar;
