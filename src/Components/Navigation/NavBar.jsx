import React, { useRef, useState } from "react";
import NavBarMenu from "./NavBarMenu";
import "../../CSS/NavBar.css";
import { Steps } from 'intro.js-react';

const NavBar = ({steps, stepsEnabled, initialStep, onExit, setInitialStep, setStepsEnabled}) => {


  return (
    <div>
      <NavBarMenu
      setInitialStep={setInitialStep}
      setStepsEnabled={setStepsEnabled}
      />
      <Steps
      enabled={stepsEnabled}
      steps={steps}
      initialStep={initialStep}
      onExit={onExit}
    />
    </div>
  );
};

export default NavBar;
