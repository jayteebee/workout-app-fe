import React, { useContext, useRef, useState } from "react";
import NavBarMenu from "./NavBarMenu";
import "../../CSS/NavBar.css";
import { Steps } from 'intro.js-react';
import { IntroJsContext } from "../../Context/IntroJsContext";

const NavBar = () => {

const {steps, stepsEnabled, initialStep, onExit} = useContext(IntroJsContext)

  return (
    <div>
      <NavBarMenu />
    </div>
  );
};

export default NavBar;
