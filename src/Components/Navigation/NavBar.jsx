import React from "react";
import { useState } from "react";
import HamburgerMenu from "../../StyleResources/HamburgerMenu.png";
import NavBarMenu from "./NavBarMenu";
import "../../CSS/NavBar.css";
import BackButton from "./BackButton";
import { Link } from "react-router-dom";


const NavBar = () => {

  return (
    // <div className="parent bbd">
    //     <BackButton className="backButton" />
  <NavBarMenu />

    // </div>
  );
};

export default NavBar;
