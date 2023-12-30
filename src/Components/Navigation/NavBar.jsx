import React, { useContext, useRef, useState } from "react";
import NavBarMenu from "./NavBarMenu";
import "../../CSS/NavBar.css";
import { Steps } from 'intro.js-react';
import { IntroJsContext } from "../../Context/IntroJsContext";

const NavBar = ({ setInitialStep, setStepsEnabled}) => {

const {steps, stepsEnabled, initialStep, onExit} = useContext(IntroJsContext)

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
